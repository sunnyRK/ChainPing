import { ethers } from "ethers";

import { useMutation } from "@tanstack/react-query";

import { useUniswap } from "../useUniswap";
import { useApprove } from "../useApprove";
import { useEoaProvider } from "../aaProvider/useEoaProvider";
import { useBiconomyProvider } from "../aaProvider/useBiconomyProvider";
import { useBatchingTxnStore, iBatchingTxn } from "../../store/BatchingTxnStore";
import { V3_SWAP_ROUTER_ADDRESS, _nonce, _functionType, uniswapSwapRouterByChainId } from "../../utils/constants";
import { useCrossChainDifiStore, iCrossChainDifi } from "../../store/CrossChainDifiStore";
import { nativeTokenNum, nativeTokenFetcher, buildParams, abiFetcherNum, abiFetcher } from "./batchingUtils";
import ChainContext from "../../Context/ChainContext";
import React from "react";

export function useRefinance() {
    const { mutateAsync: swap } = useUniswap();
    const { mutateAsync: approve } = useApprove();
    const { selectedChain, selectedChainId } = React.useContext(ChainContext);

    const { setTxHash }: iCrossChainDifi = useCrossChainDifiStore((state) => state);
    const { tokensData }: iBatchingTxn = useBatchingTxnStore((state) => state);

    async function refinance({
        isSCW,
        fromProtocol,
        toProtocol,
        tokenIn,
        tokenInName,
        tokenOut,
        tokenOutName,
        amount,
        address,
        provider,
    }: any) {
        try {
            if (!selectedChain) {
                alert("Chain is not selected!!")
            }
            setTxHash("");
            const tempTxs: any = [];

            let abiNum,
                abi,
                methodName,
                paramDetailsMethod,
                tokenInContractAddress,
                abiInterface,
                params,
                txData,
                swapData,
                isSwap,
                nativeTokenIn,
                nativeTokenOut;

            if (fromProtocol == "erc20") {
                nativeTokenIn = tokensData?.filter((token) => token.symbol === tokenInName)[0].address;
            }
            if (toProtocol == "erc20") {
                nativeTokenOut = tokensData?.filter((token) => token.symbol === tokenOutName)[0].address;
                console.log("nativeTokenOut", nativeTokenOut);
            }

            if (toProtocol != "erc20") {
                const tokenOutNum = nativeTokenNum[selectedChain][tokenOutName];
                nativeTokenOut = nativeTokenFetcher[selectedChain][tokenOutNum].nativeToken;
                console.log("nativeTokenOut", nativeTokenOut);
            }

            if (fromProtocol != "erc20") {
                abiNum = abiFetcherNum[selectedChain][tokenInName];
                abi = abiFetcher[selectedChain][abiNum]["withdrawAbi"];
                methodName = abiFetcher[selectedChain][abiNum]["withdrawMethodName"];
                paramDetailsMethod = abiFetcher[selectedChain][abiNum]["withdrawParamDetailsMethod"];
                tokenInContractAddress = abiFetcher[selectedChain][abiNum]["contractAddress"];

                console.log("tokenInName", tokenInName, tokenInContractAddress);

                const tokenInNum = nativeTokenNum[selectedChain][tokenInName];
                console.log("tokenInNum", tokenInNum);
                nativeTokenIn = nativeTokenFetcher[selectedChain][tokenInNum].nativeToken;
                console.log("nativeTokenIn", nativeTokenIn);

                abiInterface = new ethers.utils.Interface([abi]);
                params = await buildParams({
                    tokenIn,
                    tokenOut,
                    nativeTokenIn,
                    nativeTokenOut,
                    amount,
                    address,
                    paramDetailsMethod,
                });
                txData = abiInterface.encodeFunctionData(methodName, params);
                const tx1 = { to: tokenInContractAddress, data: txData };
                console.log("tx1", tx1);
                tempTxs.push(tx1);
            }

            isSwap = nativeTokenIn != nativeTokenOut ? true : false;

            if (isSwap) {
                console.log("isSwap", isSwap);
                const approveData = await approve({
                    tokenIn: nativeTokenIn,
                    spender: uniswapSwapRouterByChainId[selectedChainId],
                    amountIn: amount,
                    address,
                    web3JsonProvider: provider,
                });
                if (approveData) tempTxs.push(approveData);
                swapData = await swap({
                    tokenIn: nativeTokenIn, //: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
                    tokenOut: nativeTokenOut, // nativeTokenOut, //: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
                    amountIn: amount, //: BigNumber.from('1000000'),
                    address,
                    type: "exactIn",
                });
                tempTxs.push(swapData.swapTx);
            }

            if (toProtocol != "erc20") {
                const newTokenIn = isSwap ? nativeTokenOut : nativeTokenIn;
                const newAmount = isSwap ? swapData.amountOutprice : amount;

                abiNum = abiFetcherNum[selectedChain][tokenOutName];
                abi = abiFetcher[selectedChain][abiNum]["depositAbi"];
                methodName = abiFetcher[selectedChain][abiNum]["depositMethodName"];
                paramDetailsMethod = abiFetcher[selectedChain][abiNum]["depositParamDetailsMethod"];
                const tokenOutContractAddress = abiFetcher[selectedChain][abiNum]["contractAddress"];
                console.log(
                    "tokenOutContractAddress",
                    tokenOutContractAddress,
                    paramDetailsMethod,
                    methodName,
                    abi,
                    provider
                );

                const approveData = await approve({
                    tokenIn: newTokenIn,
                    spender: tokenOutContractAddress,
                    amountIn: newAmount,
                    address,
                    web3JsonProvider: provider,
                });
                if (approveData) tempTxs.push(approveData);

                abiInterface = new ethers.utils.Interface([abi]);
                params = await buildParams({
                    tokenIn,
                    tokenOut,
                    nativeTokenIn: newTokenIn,
                    nativeTokenOut: "",
                    amount: newAmount,
                    address,
                    paramDetailsMethod,
                });
                txData = abiInterface.encodeFunctionData(methodName, params);
                const tx2 = { to: tokenOutContractAddress, data: txData };
                tempTxs.push(tx2);
                console.log("tempTxs", tempTxs);
            }
            return tempTxs;
        } catch (error) {
            console.log("refinance-error", error);
        }
    }
    return useMutation(refinance);
}
