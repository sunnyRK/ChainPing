import { ethers } from "ethers";
import { BigNumber as bg } from "bignumber.js";

import aave_v2_Abi from "../../abis/defi/aave_v2.json";
import compound_Abi from "../../abis/defi/compound.json";
import { getContractInstance } from "../../utils/web3Libs/ethers";

bg.config({ DECIMAL_PLACES: 20 });

export const abiFetcherNum = {
    base: {
        cUSDbCv3: "1",
        aBasUSDbC: "2",
        aBasWETH: "2",
    },
    polygon: {
        cUSDC: "1",
        aUSDC: "2",
        aUSDT: "2",
        aDAI: "2",
        aWETH: "2",
        aWMATIC: "2",
        aAAVE: "2",
        aWBTC: "2",
        dForceUSDC: "3",
        aUSDCv3: "4",
        aUSDTv3: "4",
        aDAIv3: "4",
        aWETHv3: "4",
        aWMATICv3: "4",
        aAAVEv3: "4",
        aWBTCv3: "4",
        aBALv3: "4",
    },
};

export const abiFetcher = {
    base: {
        "1": {
            depositAbi: "function supply(address asset, uint256 amount)",
            withdrawAbi: "function withdraw(address asset,uint256 amount)",
            depositMethodName: "supply",
            withdrawMethodName: "withdraw",
            depositParamDetailsMethod: "compound_supply",
            withdrawParamDetailsMethod: "compound_withdraw",
            contractAddress: "0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf",
            apyFetch: "fetchApyForCompoundPolygon",
        },
        "2": {
            depositAbi: "function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode)",
            withdrawAbi: "function withdraw(address asset, uint256 amount, address to)",
            depositMethodName: "supply",
            withdrawMethodName: "withdraw",
            paramDetailsMethod: "aave_supply_v3",
            depositParamDetailsMethod: "aave_supply_v3",
            withdrawParamDetailsMethod: "aave_withdraw_v3",
            contractAddress: "0xA238Dd80C259a72e81d7e4664a9801593F98d1c5",
            apyFetch: "fetchApyForAaveV3Polygon",
        },
    },
    polygon: {
        "1": {
            depositAbi: "function supply(address asset, uint256 amount)",
            withdrawAbi: "function withdraw(address asset,uint256 amount)",
            depositMethodName: "supply",
            withdrawMethodName: "withdraw",
            depositParamDetailsMethod: "compound_supply",
            withdrawParamDetailsMethod: "compound_withdraw",
            contractAddress: "0xF25212E676D1F7F89Cd72fFEe66158f541246445",
            apyFetch: "fetchApyForCompoundPolygon",
        },
        "2": {
            depositAbi: "function deposit(address asset, uint256 amount, address onBehalfOf, uint16 referralCode)",
            withdrawAbi: "function withdraw(address asset, uint256 amount, address to)",
            depositMethodName: "deposit",
            withdrawMethodName: "withdraw",
            paramDetailsMethod: "aave_withdraw",
            depositParamDetailsMethod: "aave_deposit",
            withdrawParamDetailsMethod: "aave_withdraw",
            contractAddress: "0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf",
            apyFetch: "fetchApyForAaveV2Polygon",
        },
        "3": {
            depositAbi: "function mint(address _recipient, uint256 _mintAmount)",
            withdrawAbi: "function redeem(address _from, uint256 _redeemiToken)",
            depositMethodName: "mint",
            withdrawMethodName: "redeem",
            paramDetailsMethod: "dForce_withdraw",
            depositParamDetailsMethod: "dForce_deposit",
            withdrawParamDetailsMethod: "dForce_withdraw",
            contractAddress: "0x5268b3c4afb0860D365a093C184985FCFcb65234",
            apyFetch: "fetchApyForDForcePolygon",
        },
        "4": {
            depositAbi: "function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode)",
            withdrawAbi: "function withdraw(address asset, uint256 amount, address to)",
            depositMethodName: "supply",
            withdrawMethodName: "withdraw",
            paramDetailsMethod: "aave_supply_v3",
            depositParamDetailsMethod: "aave_supply_v3",
            withdrawParamDetailsMethod: "aave_withdraw_v3",
            contractAddress: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
            apyFetch: "fetchApyForAaveV3Polygon",
        },
    },
};

export const nativeTokenNum = {
    base: {
        cUSDbCv3: "1",
        aBasUSDbC: "1",
        aBasWETH: "2",
    },
    polygon: {
        cUSDC: "1",

        aUSDC: "1",
        aUSDT: "2",
        aDAI: "3",
        aWETH: "4",
        aWMATIC: "5",
        aAAVE: "6",
        aWBTC: "7",

        dForceUSDC: "1",

        aUSDCv3: "1",
        aUSDTv3: "2",
        aDAIv3: "3",
        aWETHv3: "4",
        aWMATICv3: "5",
        aAAVEv3: "6",
        aWBTCv3: "7",
        aBALv3: "8",
    },
};

export const nativeTokenFetcher = {
    base: {
        "1": {
            nativeToken: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA", // USDC
            symbol: "usdc"
        },
        "2": {
            nativeToken: "0x4200000000000000000000000000000000000006", // WETH
            symbol: "weth"
        },
        "3": {
            nativeToken: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22", // cbETH
            symbol: "cbeth"
        },
    },
    polygon: {
        "1": {
            nativeToken: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
            symbol: "usdc"
        },
        "2": {
            nativeToken: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
            symbol: "usdt"
        },
        "3": {
            nativeToken: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
            symbol: "dai"
        },
        "4": {
            nativeToken: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
            symbol: "weth"
        },
        "5": {
            nativeToken: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
            symbol: "wmatic"
        },
        "6": {
            nativeToken: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B",
            symbol: "aave"
        },
        "7": {
            nativeToken: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
            symbol: "wbtc"
        },
        "8": {
            nativeToken: "0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3",
            symbol: "bal"
        },
    },
};

export async function buildParams({
    tokenIn,
    tokenOut,
    nativeTokenIn,
    nativeTokenOut,
    amount,
    address,
    paramDetailsMethod,
}) {
    if (paramDetailsMethod == "aave_deposit" || paramDetailsMethod == "aave_supply_v3") {
        return [nativeTokenIn, amount, address, 0];
    } else if (paramDetailsMethod == "aave_withdraw" || paramDetailsMethod == "aave_withdraw_v3") {
        return [nativeTokenIn, amount, address];
    } else if (paramDetailsMethod == "compound_supply") {
        return [nativeTokenIn, amount];
    } else if (paramDetailsMethod == "compound_withdraw") {
        return [nativeTokenIn, amount];
    } else if (paramDetailsMethod == "dForce_deposit") {
        return [address, amount];
    } else if (paramDetailsMethod == "dForce_withdraw") {
        return [address, amount];
    }
}

export async function fetchApy({ protocol, contractAddress, provider, signer, token }) {
    if (protocol == "fetchApyForAaveV2Polygon") {
        let abi = new ethers.utils.Interface(aave_v2_Abi);
        const protocolInstance = await getContractInstance(contractAddress, abi, provider);
        const reserveData = await protocolInstance?.getReserveData(token);
        return bg(reserveData[3].toString()).dividedBy(1e25);
    } else if (protocol == "fetchApyForAaveV3Polygon") {
        let abi = new ethers.utils.Interface(aave_v2_Abi);
        const protocolInstance = await getContractInstance(contractAddress, abi, provider);
        const reserveData = await protocolInstance?.getReserveData(token);
        return bg(reserveData[2].toString()).dividedBy(1e25);
    } else if (protocol == "fetchApyForCompoundPolygon") {
        let abi = new ethers.utils.Interface(compound_Abi);
        const SecondsPerYear = 60 * 60 * 24 * 365;
        const protocolInstance = await getContractInstance(contractAddress, abi, provider);
        const utilization = await protocolInstance?.getUtilization();
        let supplyRate = await protocolInstance?.getSupplyRate(utilization);
        supplyRate = bg(supplyRate.toString()).dividedBy(1e18).multipliedBy(bg(SecondsPerYear).multipliedBy(100));
        return supplyRate;
    } else if (protocol == "fetchApyForCompoundPolygon") {
        let abi = new ethers.utils.Interface(compound_Abi);
        const SecondsPerYear = 60 * 60 * 24 * 365;
        const protocolInstance = await getContractInstance(contractAddress, abi, provider);
        const utilization = await protocolInstance?.getUtilization();
        let supplyRate = await protocolInstance?.getSupplyRate(utilization);
        supplyRate = bg(supplyRate.toString()).dividedBy(1e18).multipliedBy(bg(SecondsPerYear).multipliedBy(100));
        return supplyRate;
    }
}

interface ChainPing {
    [network: string]: string;
}

interface StarGateRouter {
    [network: string]: string;
}

interface Tokens {
    [tokenName: string]: string;
}

export const chainPingByNetwork: ChainPing= {
    '137': '0x664BFAA3ce3C03aAf18EC2627d81f439576f7969',
    // '106': '0x6FE8e3E0c47043f136640dF7972C1e3F144B807F',
    '43114': '0x934E5421D4ce678ae4c4B136306Fbee91bfDBbC8',
    '42161': '0xBA821135197bB2614F5Bd8943b5d1607288DC60d',
    // '111': '0x934E5421D4ce678ae4c4B136306Fbee91bfDBbC8',
    "10": '0x2b2ED70C5B25b71CaA766C1054092A9Ff0900df0',
    '1': '0x0000000000000000000000000000000000000000',
    '8453': '0x5764FfF7629c03aFE36AA35114C250b2218a77E2',
}

// export const starGateRouterByNetwork: StarGateRouter = {
//     '137': '0x45A01E4e04F14f7A4a6702c74187c5F6222033cd',
//     '43114': '0x45A01E4e04F14f7A4a6702c74187c5F6222033cd',
//     '42161': '0x53Bf833A5d6c4ddA888F69c22C88C9f356a41614',
//     '10': '0xB0D502E938ed5f4df2E681fE6E419ff29631d62b',
//     '1': '0x8731d54E9D02c286767d56ac03e8037C07e01e98',
//     '8453': '0x45f1A95A4D3f3836523F5c83673c797f4d4d263B',
// }

export const starGateRouterByNetwork: StarGateRouter = {
    '137': '0xeCc19E177d24551aA7ed6Bc6FE566eCa726CC8a9',
    '43114': '0xeCc19E177d24551aA7ed6Bc6FE566eCa726CC8a9',
    '42161': '0xeCc19E177d24551aA7ed6Bc6FE566eCa726CC8a9',
    '10': '0xeCc19E177d24551aA7ed6Bc6FE566eCa726CC8a9',
    '1': '0xeCc19E177d24551aA7ed6Bc6FE566eCa726CC8a9',
    '8453': '0xeCc19E177d24551aA7ed6Bc6FE566eCa726CC8a9',
}

export const tokensByNetworkForCC: Record<string, Tokens> = {
    '137':  {
        usdc: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    },
    '43114':  {
        usdc: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    },
    '42161':  {
        usdc: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
    },
    '10':  {
        usdc: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    },
    '1':  {
        usdc: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    },
    '8453':  {
        usdc: '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA',
    }
}
