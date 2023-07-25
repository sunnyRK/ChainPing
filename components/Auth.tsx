import {useState, useEffect, useRef} from "react"
import SocialLogin from "@biconomy/web3-auth"
import {ChainId} from "@biconomy/core-types"
import {ethers} from "ethers"
import SmartAccount from "@biconomy/smart-account"
import {css} from "@emotion/css"
import {Biconomy_AA_Key} from "../utils/keys"
import {useAppStore} from "../store/appStore"

export default function Home() {
    const {setSmartAccount, smartAccount}: any = useAppStore((state) => state)

    // const [smartAccount, setSmartAccount] = useState<SmartAccount | null>(null);
    const [interval, enableInterval] = useState(false)
    const sdkRef = useRef<SocialLogin | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        let configureLogin
        if (interval) {
            configureLogin = setInterval(() => {
                if (!!sdkRef.current?.provider) {
                    setupSmartAccount()
                    clearInterval(configureLogin)
                }
            }, 1000)
        }
    }, [interval])

    async function login() {
        if (!sdkRef.current) {
            const socialLoginSDK = new SocialLogin()
            // const signature1 = await socialLoginSDK.whitelistUrl(
            //   "http://localhost:3000/"
            // );
            await socialLoginSDK.init({
                chainId: ethers.utils.hexValue(ChainId.POLYGON_MAINNET),
                // whitelistUrls: {
                //   "http://localhost:3000/": signature1,
                // },
            })
            sdkRef.current = socialLoginSDK
        }
        if (!sdkRef.current.provider) {
            // sdkRef.current.showConnectModal()
            sdkRef.current.showWallet()
            enableInterval(true)
        } else {
            setupSmartAccount()
        }
    }

    async function setupSmartAccount() {
        if (!sdkRef?.current?.provider) return
        sdkRef.current.hideWallet()
        setLoading(true)
        const web3Provider = new ethers.providers.Web3Provider(
            sdkRef.current.provider
        )
        try {
            const smartAccount = new SmartAccount(web3Provider, {
                activeNetworkId: ChainId.POLYGON_MAINNET,
                supportedNetworksIds: [ChainId.POLYGON_MAINNET],
                networkConfig: [
                    {
                        chainId: ChainId.POLYGON_MAINNET,
                        dappAPIKey: Biconomy_AA_Key,
                    },
                ],
            })
            await smartAccount.init()
            setSmartAccount(smartAccount)
            setLoading(false)
        } catch (err) {
            console.log("error setting up smart account... ", err)
        }
    }

    const logout = async () => {
        if (!sdkRef.current) {
            console.error("Web3Modal not initialized.")
            return
        }
        await sdkRef.current.logout()
        sdkRef.current.hideWallet()
        setSmartAccount(null)
        enableInterval(false)
    }

    return (
        <div>
            <ul>
                <li>
                    <a href="#">DefiLens</a>
                </li>
                {!smartAccount && !loading && (
                    <li>
                        <a onClick={login}>Login</a>
                    </li>
                )}
                {loading && (
                    <li>
                        <a>Loading account details...</a>
                    </li>
                )}
                {!!smartAccount && (
                    <li>
                        <a onClick={logout}>Logout</a>
                    </li>
                )}
                {!!smartAccount && (
                    <li>
                        <a>Biconomy SCW Wallet: {smartAccount.address}</a>
                    </li>
                )}
            </ul>
            {/* <div className={containerStyle}>
        <h1 className={headerStyle}>OnClick Recipe For Defi</h1>
        {!smartAccount && !loading && (
          <button className={buttonStyle} onClick={login}>
            Login
          </button>
        )}
        {loading && <p>Loading account details...</p>}
        {!!smartAccount && (
          <div className={detailsContainerStyle}>
            <div>
              <h3>Smart account address of 0xb50685c25485CA8C520F5286Bbbf1d3F216D6989:</h3>
              <p>{smartAccount.address}</p>
              <button className={buttonStyle} onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div> */}
        </div>
    )
}

const detailsContainerStyle = css`
    margin-top: 10px;
`

// &:hover {
//   background-color: rgba(0, 0, 0, 0.2);
// };
const buttonStyle = css`
    padding: 14px;
    width: 300px;
    border: none;
    cursor: pointer;
    border-radius: 999px;
    outline: none;
    margin-top: 20px;
    transition: all 0.25s;
    &:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
`

const headerStyle = css`
    font-size: 44px;
`

const containerStyle = css`
    width: 900px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 100px;
`
