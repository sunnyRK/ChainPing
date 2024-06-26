import { toast } from "react-hot-toast";
import { BigNumber, ethers } from "ethers";

import { parseEther } from "ethers/lib/utils";
import { useMutation } from "@tanstack/react-query";

import IERC20 from "../../abis/IERC20.json";
import ChainPing from "../../abis/ChainPing.json";
import { ChainIdDetails } from "../../utils/data/network";
import IStarGateRouter from "../../abis/IStarGateRouter.json";
import { iGlobal, useGlobalStore } from "../../store/GlobalStore";
import { _functionType, _nonce } from "../../utils/data/constants";
import { iTrading, useTradingStore } from "../../store/TradingStore";
import { batch, calculateFees, chooseChianId } from "../../utils/helper";
import { decreasePowerByDecimals, incresePowerByDecimals } from "../../utils/helper";
import { chainPingByNetwork, starGateRouterByNetwork, tokensByNetworkForCC } from "../../utils/data/protocols";
import { getContractInstance, getErc20Allownace, getErc20Balanceof, getProvider } from "../../utils/web3Libs/ethers";

export function useCCSendTx() {
    const { smartAccount, smartAccountAddress }: iGlobal = useGlobalStore((state) => state);

    const { selectedFromNetwork, selectedToNetwork, amountIn, fromTokenDecimal, setTxHash }: iTrading = useTradingStore(
        (state) => state
    );

    async function sendTxToChain({
        tokenIn,
        address,
        isSCW,
        params,
        isThisAmount,
        srcPoolId,
        destPoolId,
        fromChainId,
        toChainId,
        currentFunc,
        currentAbi,
        contractAddress,
        extraOrShareToken,
    }) {
        try {

            alert("sendTxToChain")
            // if (isSCW) {
            //     setSendtxLoading(true);
            // } else {
            //     setSendtxLoadingForEoa(true);
            // }
            // if (!address) throw "Connect a wallet or refresh it";
            // if (!smartAccount) throw "You need to login";
            // if (!simulation) throw "First simulate then send Tx";
            // if (contractIndex == "") throw "Enter contractIndex field";
            // if (!amountIn) throw "Enter amountIn field";
            // if (!isThisAmount) throw "Select amount field";
            // if (!allNetworkData) throw "a need to fetch";

            const _tempAmount = BigNumber.from(await incresePowerByDecimals(amountIn, fromTokenDecimal).toString());
            let _currentAddress;
            let _currentProvider;
            if (isSCW) {
                _currentAddress = smartAccountAddress;
                _currentProvider = smartAccount.provider;
            } else {
                _currentAddress = address;
                _currentProvider = smartAccount.provider;
            }

            const fromStarGateRouter: any = starGateRouterByNetwork[selectedFromNetwork.chainId];
            const toUsdc = tokensByNetworkForCC[selectedToNetwork.chainId].usdc;
            const toChainPing: any = chainPingByNetwork[selectedToNetwork.chainId];

            setTxHash("");
            const abi = ethers.utils.defaultAbiCoder;

            const erc20TokenInInstance = await getContractInstance(tokenIn, IERC20, _currentProvider);
            if (!erc20TokenInInstance) return;
            const balance = await getErc20Balanceof(erc20TokenInInstance, _currentAddress);

            if (isSCW) {
                if (BigNumber.from(balance).lt(BigNumber.from(_tempAmount))) {
                    toast.error("You don't have enough balance in SmartAccount");
                    return;
                }
            } else {
                if (BigNumber.from(balance).lt(BigNumber.from(_tempAmount))) {
                    toast.error("You don't have enough balance in EOA");
                    return;
                }
            }

            let approveTx;
            const allowance = await getErc20Allownace(erc20TokenInInstance, _currentAddress, fromStarGateRouter);
            if (!BigNumber.from(allowance).gte(BigNumber.from(_tempAmount))) {
                const approveData = await erc20TokenInInstance.populateTransaction.approve(
                    fromStarGateRouter,
                    _tempAmount
                );
                approveTx = { to: approveData.to, data: approveData.data };
            }
            const amountAfterSlippage = await calculateFees(
                address,
                _tempAmount,
                srcPoolId,
                destPoolId,
                toChainId,
                fromStarGateRouter,
                _currentProvider
            );
            params[isThisAmount] = amountAfterSlippage.toString();

            let abiInterfaceForDestDefiProtocol = new ethers.utils.Interface(currentAbi);
            // const destChainExecData = abiInterfaceForDestDefiProtocol.encodeFunctionData(currentFunc, params[funcIndex])
            const destChainExecData = abiInterfaceForDestDefiProtocol.encodeFunctionData(currentFunc, params);

            // const contractAddress = allNetworkData?.contracts[contractIndex].contractAddress;
            // const extraOrShareToken = allNetworkData?.contracts[contractIndex].extraOrShareToken;
            const destChainExecTx = { to: contractAddress, data: destChainExecData };
            let data;
            if (toChainId == "106" || toChainId == "111" || toChainId == "184" || toChainId == "109") {
                data = abi.encode(
                    ["uint256", "uint256", "address", "address", "address", "bytes"],
                    [
                        BigNumber.from("0"),
                        amountAfterSlippage,
                        contractAddress,
                        address,
                        extraOrShareToken,
                        destChainExecTx.data,
                    ]
                );
            } else {
                data = abi.encode(
                    ["uint256", "uint256", "address", "address", "bytes"],
                    [BigNumber.from("0"), amountAfterSlippage, contractAddress, address, destChainExecTx.data]
                );
            }

            const srcAddress = ethers.utils.solidityPack(["address"], [_currentAddress]);
            let abiInterfaceForChainPing = new ethers.utils.Interface(ChainPing);
            const stargateParams = [fromChainId, srcAddress, _nonce, toUsdc, amountAfterSlippage, data];
            const encodedDataForChainPing = abiInterfaceForChainPing.encodeFunctionData("sgReceive", stargateParams);
            const erc20Interface = new ethers.utils.Interface(["function transfer(address _account, uint256 _value)"]);
            const dummmyTranferToCheckData = erc20Interface.encodeFunctionData("transfer", [
                toChainPing,
                amountAfterSlippage,
            ]);
            const gasUsed = await batch(
                toUsdc,
                toChainPing,
                dummmyTranferToCheckData,
                encodedDataForChainPing,
                false,
                chooseChianId(toChainId)
            );

            const stargateRouter = await getContractInstance(fromStarGateRouter, IStarGateRouter, _currentProvider);
            if (!stargateRouter) return;
            const lzParams = {
                dstGasForCall: BigNumber.from(gasUsed).add(BigNumber.from("30000")),
                dstNativeAmount: 0,
                dstNativeAddr: "0x",
            };
            const packedToAddress = ethers.utils.solidityPack(["address"], [toChainPing]);
            let quoteData = await stargateRouter.quoteLayerZeroFee(
                toChainId,
                _functionType,
                packedToAddress,
                data,
                lzParams
            );

            let stargateTx = await stargateRouter.populateTransaction.swap(
                toChainId,
                srcPoolId,
                destPoolId,
                _currentAddress,
                _tempAmount,
                0,
                lzParams,
                packedToAddress,
                data,
                { value: quoteData[0] }
            );

            const scwOrEoaNativeBalance = await _currentProvider.getBalance(_currentAddress);
            const currentBalance = BigNumber.from(scwOrEoaNativeBalance);
            const minimumBalanceRequired = await decreasePowerByDecimals(quoteData[0].toString(), 18);

            // Extra 1e18 should more as of now
            if (!currentBalance.gt(quoteData[0].add(parseEther("0")))) {
                toast.error(
                    `${minimumBalanceRequired.toString()} ${
                        ChainIdDetails[selectedFromNetwork.chainId].gasFeesName
                    } in your SmartAccount wallet`
                );
                return;
            }

            const sendTx = { to: stargateTx.to, data: stargateTx.data, value: stargateTx.value };
            if (approveTx) {
                return [approveTx, sendTx];
            } else {
                return [sendTx];
            }
        } catch (error: any) {
            if (error.message) {
                console.log("sendTx: Error: ", error);
            } else {
                console.log("sendTx: Error: ", error);
            }
            return;
        }
    }
    return useMutation(sendTxToChain);
}
