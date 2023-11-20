import { arbitrum, avalanche, ethereum, optimism } from "../../assets/images";

export const tokensByProtocol = {
    polygon: {
        aaveV2: [
            {
                name: "aUSDC",
                icon: ethereum,
            },
            {
                name: "aUSDT",
                icon: optimism,
            },
            {
                name: "aDAI",
                icon: avalanche,
            },
            {
                name: "aWETH",
                icon: ethereum,
            },
            {
                name: "aWMATIC",
                icon: optimism,
            },
            {
                name: "aAAVE",
                icon: avalanche,
            },
            {
                name: "aWBTC",
                icon: optimism,
            },
        ],
        aaveV3: [
            {
                name: "aUSDCv3",
                icon: ethereum,
            },
            {
                name: "aUSDTv3",
                icon: optimism,
            },
            {
                name: "aDAIv3",
                icon: avalanche,
            },
            {
                name: "aWETHv3",
                icon: ethereum,
            },
            {
                name: "aWMATICv3",
                icon: optimism,
            },
            {
                name: "aAAVEv3",
                icon: avalanche,
            },
            {
                name: "aWBTCv3",
                icon: ethereum,
            },
            {
                name: "aBALv3",
                icon: optimism,
            },
        ],
        compoundV3: [
            {
                name: "cUSDC",
                icon: ethereum,
            },
        ],
        dForce: [
            {
                name: "dForceUSDC",
                icon: optimism,
            },
        ],
    },
    avalanche: {
        aaveV3: [
            {
                name: "aUSDT",
                icon: avalanche,
            },
            {
                name: "aUSDC",
                icon: ethereum,
            },
            {
                name: "aWAVAX",
                icon: avalanche,
            },
            {
                name: "aBTCb",
                icon: ethereum,
            },
            {
                name: "aWETHe",
                icon: avalanche,
            },
            {
                name: "aWBTCe",
                icon: ethereum,
            },
            {
                name: "asAVAX",
                icon: avalanche,
            },
            {
                name: "aLINKe",
                icon: ethereum,
            },
            {
                name: "aDAIe",
                icon: avalanche,
            },
            {
                name: "aAAVEe",
                icon: ethereum,
            },
            {
                name: "aMAI",
                icon: avalanche,
            },
            {
                name: "aFRAX",
                icon: ethereum,
            },
        ],
    },
    arbitrum: {
        aaveV3: [
            {
                name: "aWETH",
                icon: avalanche,
            },
            {
                name: "aUSDC",
                icon: avalanche,
            },
            {
                name: "aUSDCe",
                icon: avalanche,
            },
            {
                name: "awstETH",
                icon: avalanche,
            },
            {
                name: "aWBTC",
                icon: avalanche,
            },
            {
                name: "aUSDT",
                icon: avalanche,
            },
            {
                name: "aARB",
                icon: avalanche,
            },
            {
                name: "aLINK",
                icon: avalanche,
            },
            {
                name: "aDAI",
                icon: avalanche,
            },
            {
                name: "arETH",
                icon: avalanche,
            },
            {
                name: "aLUSD",
                icon: avalanche,
            },
            {
                name: "aAAVE",
                icon: avalanche,
            },
            {
                name: "aFRAX",
                icon: avalanche,
            },
            {
                name: "aEURS",
                icon: avalanche,
            },
        ],
        compoundV3: [
            {
                name: "cUSDCev3",
                icon: arbitrum,
            },
            {
                name: "cUSDCv3",
                icon: arbitrum,
            },
        ],
    },
    optimism: {
        aaveV3: [
            {
                name: "aDAI",
                icon: optimism,
            },
            {
                name: "aOP",
                icon: optimism,
            },
            {
                name: "aWETH",
                icon: optimism,
            },
            {
                name: "awstETH",
                icon: optimism,
            },
            {
                name: "aWBTC",
                icon: optimism,
            },
            {
                name: "aUSDC",
                icon: optimism,
            },
            {
                name: "aUSDT",
                icon: optimism,
            },
            {
                name: "aLINK",
                icon: optimism,
            },
            {
                name: "asUSD",
                icon: optimism,
            },
            {
                name: "arETH",
                icon: optimism,
            },
            {
                name: "aAAVE",
                icon: optimism,
            },
            {
                name: "aLUSD",
                icon: optimism,
            },
        ],
    },
    base: {
        aaveV3: [
            {
                name: "aBasUSDbC",
                icon: avalanche,
            },
            {
                name: "aBasWETH",
                icon: ethereum,
            },
        ],
        compoundV3: [
            {
                name: "cUSDbCv3",
                icon: optimism,
            },
        ],
    },
};

export const tokenAddressByProtocol = {
    polygon: {
        aaveV2: {
            aUSDC: "0x1a13F4Ca1d028320A707D99520AbFefca3998b7F",
            aUSDT: "0x60D55F02A771d515e077c9C2403a1ef324885CeC",
            aDAI: "0x27F8D03b3a2196956ED754baDc28D73be8830A6e",
            aWETH: "0x28424507fefb6f7f8E9D3860F56504E4e5f5f390",
            aWMATIC: "0x8dF3aad3a84da6b69A4DA8aeC3eA40d9091B2Ac4",
            aAAVE: "0x1d2a0E5EC8E5bBDCA5CB219e649B565d8e5c3360",
            aWBTC: "0x5c2ed810328349100A66B82b78a1791B101C9D61",
        },
        aaveV3: {
            aUSDCv3: "0x625E7708f30cA75bfd92586e17077590C60eb4cD",
            aUSDTv3: "0x6ab707Aca953eDAeFBc4fD23bA73294241490620",
            aDAIv3: "0x82E64f49Ed5EC1bC6e43DAD4FC8Af9bb3A2312EE",
            aWETHv3: "0xe50fA9b3c56FfB159cB0FCA61F5c9D750e8128c8",
            aWMATICv3: "0x6d80113e533a2C0fe82EaBD35f1875DcEA89Ea97",
            aAAVEv3: "0xf329e36C7bF6E5E86ce2150875a84Ce77f477375",
            aWBTCv3: "0x078f358208685046a11C85e8ad32895DED33A249",
            aBALv3: "0x8ffDf2DE812095b1D19CB146E4c004587C0A0692",
        },
        compoundV3: {
            cUSDC: "0xF25212E676D1F7F89Cd72fFEe66158f541246445",
        },
        dForce: {
            dForceUSDC: "0x5268b3c4afb0860D365a093C184985FCFcb65234",
        },
    },
    avalanche: {
        aaveV3: {
            aUSDT: "0x6ab707Aca953eDAeFBc4fD23bA73294241490620",
            aUSDC: "0x625E7708f30cA75bfd92586e17077590C60eb4cD",
            aWAVAX: "0x6d80113e533a2C0fe82EaBD35f1875DcEA89Ea97",
            aBTCb: "0x8ffDf2DE812095b1D19CB146E4c004587C0A0692",
            aWETHe: "0xe50fA9b3c56FfB159cB0FCA61F5c9D750e8128c8",
            aWBTCe: "0x078f358208685046a11C85e8ad32895DED33A249",
            asAVAX: "0x513c7E3a9c69cA3e22550eF58AC1C0088e918FFf",
            aLINKe: "0x191c10Aa4AF7C30e871E70C95dB0E4eb77237530",
            aDAIe: "0x82E64f49Ed5EC1bC6e43DAD4FC8Af9bb3A2312EE",
            aAAVEe: "0xf329e36C7bF6E5E86ce2150875a84Ce77f477375",
            aMAI: "0x8Eb270e296023E9D92081fdF967dDd7878724424",
            aFRAX: "0xc45A479877e1e9Dfe9FcD4056c699575a1045dAA",
        },
    },
    arbitrum: {
        aaveV3: {
            aWETH: "0xe50fA9b3c56FfB159cB0FCA61F5c9D750e8128c8",
            aUSDC: "0x724dc807b04555b71ed48a6896b6F41593b8C637",
            aUSDCe: "0x625E7708f30cA75bfd92586e17077590C60eb4cD",
            awstETH: "0x513c7E3a9c69cA3e22550eF58AC1C0088e918FFf",
            aWBTC: "0x078f358208685046a11C85e8ad32895DED33A249",
            aUSDT: "0x6ab707Aca953eDAeFBc4fD23bA73294241490620",
            aARB: "0x6533afac2E7BCCB20dca161449A13A32D391fb00",
            aLINK: "0x191c10Aa4AF7C30e871E70C95dB0E4eb77237530",
            aDAI: "0x82E64f49Ed5EC1bC6e43DAD4FC8Af9bb3A2312EE",
            arETH: "0x8Eb270e296023E9D92081fdF967dDd7878724424",
            aLUSD: "0x8ffDf2DE812095b1D19CB146E4c004587C0A0692",
            aAAVE: "0xf329e36C7bF6E5E86ce2150875a84Ce77f477375",
            aFRAX: "0x38d693cE1dF5AaDF7bC62595A37D667aD57922e5",
            aEURS: "0x6d80113e533a2C0fe82EaBD35f1875DcEA89Ea97",
        },
        compoundV3: {
            cUSDCev3: "0xA5EDBDD9646f8dFF606d7448e414884C7d905dCA",
            cUSDCv3: "0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf",
        },
    },
    optimism: {
        aaveV3: {
            aDAI: "0x82E64f49Ed5EC1bC6e43DAD4FC8Af9bb3A2312EE",
            aOP: "0x513c7E3a9c69cA3e22550eF58AC1C0088e918FFf",
            aWETH: "0xe50fA9b3c56FfB159cB0FCA61F5c9D750e8128c8",
            awstETH: "0xc45A479877e1e9Dfe9FcD4056c699575a1045dAA",
            aWBTC: "0x078f358208685046a11C85e8ad32895DED33A249",
            aUSDC: "0x625E7708f30cA75bfd92586e17077590C60eb4cD",
            aUSDT: "0x6ab707Aca953eDAeFBc4fD23bA73294241490620",
            aLINK: "0x191c10Aa4AF7C30e871E70C95dB0E4eb77237530",
            asUSD: "0x6d80113e533a2C0fe82EaBD35f1875DcEA89Ea97",
            arETH: "0x724dc807b04555b71ed48a6896b6F41593b8C637",
            aAAVE: "0xf329e36C7bF6E5E86ce2150875a84Ce77f477375",
            aLUSD: "0x8Eb270e296023E9D92081fdF967dDd7878724424",
        },
    },
    ethereum: {},
    base: {
        aaveV3: {
            aBasUSDbC: "0x0a1d576f3eFeF75b330424287a95A366e8281D54",
            aBasWETH: "0xD4a0e0b9149BCee3C920d2E00b5dE09138fd8bb7",
        },
        compoundV3: {
            cUSDbCv3: "0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf",
        },
    },
};