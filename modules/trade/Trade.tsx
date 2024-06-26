import { startCase } from "lodash";
import { BigNumber as bg } from "bignumber.js";

import Image from "next/image";
import { BiLoaderAlt } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { CiCircleChevDown } from "react-icons/ci";
import { MdDelete, MdOutlineArrowBack } from "react-icons/md";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { tTrade, tTradeProtocol } from "./types";
import Button from "../../components/Button/Button";
import { protocolNames } from "../../utils/data/protocols";
import SelectionBar from "../../components/SelectionBar/SelectionBar";
import { ChainIdDetails, NETWORK_LIST } from "../../utils/data/network";
import ExecuteBatch from "../../components/Models/ExecuteBatch/ExecuteBatch";
import ExecuteMethod from "../../components/Models/ExecuteMethod/ExecuteMethod";
import { iTokenData, iTrading, useTradingStore } from "../../store/TradingStore";
import { defaultBlue, downLine, gas, optimism, swap, warning } from "../../assets/images";

bg.config({ DECIMAL_PLACES: 10 });

const Trade: React.FC<any> = ({
    handleSelectFromNetwork,
    handleSelectToNetwork,
    onChangeFromProtocol,
    onChangeFromToken,
    onChangeToProtocol,
    onChangeToToken,
    onChangeAmountIn,
    handleSwap,
    removeBatch,
    toggleShowBatchList,
    sendSingleBatchToList,
    handleExecuteMethod,
    ExecuteAllBatches,
    closeFromSelectionMenu,
    closeToSelectionMenu,
    createSession,
    erc20Transfer,
}: tTrade) => {
    const {
        maxBalance,
        ismaxBalanceLoading,
        selectedFromNetwork,
        selectedFromProtocol,
        selectedFromToken,
        selectedToNetwork,
        selectedToProtocol,
        selectedToToken,
        showFromSelectionMenu,
        setShowFromSelectionMenu,
        showToSelectionMenu,
        setShowToSelectionMenu,
        fromTokensData,
        toTokensData,
        amountIn,
        fromTokenDecimal,
        filterFromToken,
        setFilterFromToken,
        filterToToken,
        setFilterToToken,
        filterFromAddress,
        setFilterFromAddress,
        filterToAddress,
        setFilterToAddress,
        addToBatchLoading,
        showBatchList,
        showIndividualBatchList,
        txhash,
        sendTxLoading,
        individualBatch,
        showExecuteBatchModel,
        totalfees,
        showExecuteMethodModel,
    }: iTrading = useTradingStore((state) => state);

    return (
        <div className="w-full h-full flex flex-col justify-start items-center py-5">
            <div
                className={`${
                    showBatchList ? "!w-full" : "!w-[50%]"
                } h-full flex flex-col lg:flex-row justify-start lg:justify-center items-center lg:items-start gap-4`}
            >
                <div className="w-full md:max-w-xl h-full">
                    {showFromSelectionMenu || showToSelectionMenu ? (
                        <div className="w-full max-h-full bg-backgound-300 border border-backgound-600 shadow shadow-backgound-500 flex flex-col gap-2 rounded-lg cursor-pointer p-3">
                            <MdOutlineArrowBack
                                onClick={
                                    showFromSelectionMenu
                                        ? () => closeFromSelectionMenu()
                                        : () => closeToSelectionMenu()
                                }
                                className="rounded-full h-10 w-10 p-2 hover:bg-font-1100 active:bg-font-1000  text-font-100"
                            />
                            <div className="flex flex-col justify-center items-center gap-5 px-4">
                                <div className="flex flex-wrap justify-center items-center gap-2">
                                    {NETWORK_LIST?.map((item) => {
                                        return (
                                            <div
                                                key={item.chainName}
                                                onClick={
                                                    showFromSelectionMenu
                                                        ? () => handleSelectFromNetwork(item)
                                                        : () => handleSelectToNetwork(item)
                                                }
                                                className={`h-14 w-14 flex justify-center items-center gap-3 bg-font-100 hover:bg-font-200 active:bg-font-400 border-2 border-font-200 hover:border-font-300 shadow-sm rounded-md cursor-pointer  ${
                                                    showFromSelectionMenu
                                                        ? selectedFromNetwork.chainName === item.chainName
                                                            ? "!shadow-sm !shadow-backgound-600 !bg-font-300"
                                                            : ""
                                                        : selectedToNetwork.chainName === item.chainName
                                                        ? "!shadow-sm !shadow-backgound-600 !bg-font-300"
                                                        : ""
                                                }`}
                                            >
                                                <Image src={item.icon} alt="" className="h-10 w-10 rounded-full" />
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="w-full flex justify-start items-center gap-2 bg-font-100 border-2 border-font-300 rounded-md py-2 px-5">
                                    <input
                                        type="text"
                                        value={showFromSelectionMenu ? filterFromToken : filterToToken}
                                        onChange={
                                            showFromSelectionMenu
                                                ? (e) => setFilterFromToken(e.target.value)
                                                : (e) => setFilterToToken(e.target.value)
                                        }
                                        placeholder="Search by Protocol"
                                        className="w-full text-sm md:text-base outline-none placeholder-font-500 text-font-1100"
                                    />
                                    <AiOutlineSearch />
                                </div>
                                <div className="w-full overflow-auto flex flex-col justify-center items-center py-1">
                                    {showFromSelectionMenu && selectedFromNetwork.chainName && (
                                        <div className="w-full max-h-96">
                                            {protocolNames[selectedFromNetwork.chainId]?.key.map(
                                                (item: tTradeProtocol, protocolIndex: number) => {
                                                    return protocolNames[selectedFromNetwork.chainId].value[
                                                        protocolIndex
                                                    ]
                                                        .toLowerCase()
                                                        .includes(filterFromToken.toLowerCase()) ? (
                                                        <div key={item.name} className="w-full py-0.5">
                                                            <div
                                                                key={item.name}
                                                                onClick={() => onChangeFromProtocol(item.name)}
                                                                className="w-full flex justify-between items-center gap-3 text-font-300 hover:text-font-100 border border-font-1100 bg-backgound-500 hover:bg-backgound-100 active:bg-backgound-200 py-2 px-3 my-1 rounded-lg cursor-pointer"
                                                            >
                                                                <div className="w-full flex justify-start items-center gap-3">
                                                                    <Image
                                                                        src={item.icon}
                                                                        alt=""
                                                                        className="h-8 w-8 bg-font-200 rounded-full cursor-pointer"
                                                                    />
                                                                    <div>
                                                                        {
                                                                            protocolNames[selectedFromNetwork.chainId]
                                                                                .value[protocolIndex]
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <CiCircleChevDown
                                                                    size="30px"
                                                                    className="text-font-500 h-7 w-7"
                                                                />
                                                            </div>

                                                            {selectedFromProtocol === item.name &&
                                                                selectedFromProtocol !== "erc20" && (
                                                                    <div className="bg-backgound-100 text-font-200 rounded-lg p-3 my-1.5">
                                                                        <div className="w-full flex justify-start items-center gap-2 bg-font-100 rounded-md shadow py-1.5 px-5">
                                                                            <input
                                                                                type="text"
                                                                                value={filterFromAddress}
                                                                                onChange={(e) =>
                                                                                    setFilterFromAddress(e.target.value)
                                                                                }
                                                                                placeholder="Search by Token"
                                                                                className="w-full text-sm md:text-base outline-none placeholder-font-500 text-font-1100"
                                                                            />
                                                                            <AiOutlineSearch />
                                                                        </div>
                                                                        {item.tokenList.length > 0 &&
                                                                            item.tokenList?.map(
                                                                                (
                                                                                    token: tTradeProtocol,
                                                                                    tokenIndex: number
                                                                                ) => {
                                                                                    return token.name
                                                                                        .toLowerCase()
                                                                                        .includes(
                                                                                            filterFromAddress.toLowerCase()
                                                                                        ) ? (
                                                                                        <div
                                                                                            key={tokenIndex}
                                                                                            onClick={() =>
                                                                                                onChangeFromToken(
                                                                                                    token.name
                                                                                                )
                                                                                            }
                                                                                            className="w-full flex justify-start items-center gap-3 hover:bg-backgound-200 active:bg-backgound-100 py-2 px-3 rounded-lg cursor-pointer my-2"
                                                                                        >
                                                                                            {/* <Image
                                                                                                src={token.icon}
                                                                                                alt=""
                                                                                                className="h-7 w-7 bg-font-200 rounded-full cursor-pointer"
                                                                                            /> */}
                                                                                            {token.name}
                                                                                        </div>
                                                                                    ) : null;
                                                                                }
                                                                            )}
                                                                    </div>
                                                                )}

                                                            {item.name === "erc20" &&
                                                                selectedFromProtocol === "erc20" &&
                                                                fromTokensData && (
                                                                    <div className="bg-backgound-100 text-font-200 rounded-lg p-3 my-1.5">
                                                                        <div className="w-full flex justify-start items-center gap-2 bg-font-100 rounded-md shadow py-1.5 px-5">
                                                                            <input
                                                                                type="text"
                                                                                value={filterFromAddress}
                                                                                onChange={(e) =>
                                                                                    setFilterFromAddress(e.target.value)
                                                                                }
                                                                                placeholder="Search by Token"
                                                                                className="w-full text-sm md:text-base outline-none placeholder-font-500 text-font-1100"
                                                                            />
                                                                            <AiOutlineSearch />
                                                                        </div>
                                                                        {fromTokensData?.map(
                                                                            (token: iTokenData, tokenIndex: number) => {
                                                                                return token.symbol
                                                                                    .toLowerCase()
                                                                                    .includes(
                                                                                        filterFromAddress.toLowerCase()
                                                                                    ) ? (
                                                                                    <div
                                                                                        key={tokenIndex}
                                                                                        onClick={() =>
                                                                                            onChangeFromToken(
                                                                                                token.symbol
                                                                                            )
                                                                                        }
                                                                                        className="w-full flex justify-start items-center gap-3 text-font-300 hover:text-font-100 hover:bg-backgound-200 active:bg-backgound-100 py-2 px-3 rounded-lg cursor-pointer my-2"
                                                                                    >
                                                                                        <Image
                                                                                            src={
                                                                                                token.logoURI.includes(
                                                                                                    "s2.coinmarketcap.com"
                                                                                                )
                                                                                                    ? optimism
                                                                                                    : token.logoURI
                                                                                            }
                                                                                            alt=""
                                                                                            width={10}
                                                                                            height={10}
                                                                                            className="h-10 w-10 bg-font-200 rounded-full cursor-pointer"
                                                                                        />
                                                                                        {/* <Image
                                                                                            src="https://assets.coingecko.com/coins/images/14061/thumb/Shared_HOPR_logo_512px.png?1614073468"
                                                                                            alt="HOPR Logo"
                                                                                            width={10}
                                                                                            height={10}
                                                                                            className="h-7 w-7 bg-font-200 rounded-full cursor-pointer"
                                                                                        /> */}
                                                                                        {token.symbol}
                                                                                    </div>
                                                                                ) : null;
                                                                            }
                                                                        )}
                                                                    </div>
                                                                )}
                                                        </div>
                                                    ) : null;
                                                }
                                            )}
                                        </div>
                                    )}

                                    {showToSelectionMenu && selectedToNetwork.chainName && (
                                        <div className="w-full max-h-96">
                                            {protocolNames[selectedToNetwork.chainId]?.key.map(
                                                (item: tTradeProtocol, protocolIndex: number) => {
                                                    return protocolNames[selectedToNetwork.chainId].value[protocolIndex]
                                                        .toLowerCase()
                                                        .includes(filterToToken.toLowerCase()) ? (
                                                        <div key={item.name} className="w-full py-0.5">
                                                            <div
                                                                key={item.name}
                                                                onClick={() => onChangeToProtocol(item.name)}
                                                                className="w-full flex justify-between items-center gap-3 text-font-300 hover:text-font-100 border border-font-1100 bg-backgound-500 hover:bg-backgound-100 active:bg-backgound-200 py-2 px-3 my-1 rounded-lg cursor-pointer"
                                                            >
                                                                <div className="w-full flex justify-start items-center gap-3">
                                                                    <Image
                                                                        src={item.icon}
                                                                        alt=""
                                                                        className="h-8 w-8 bg-font-200 rounded-full cursor-pointer"
                                                                    />
                                                                    <div>
                                                                        {
                                                                            protocolNames[selectedToNetwork.chainId]
                                                                                .value[protocolIndex]
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <CiCircleChevDown
                                                                    size="30px"
                                                                    className="text-font-500 h-7 w-7"
                                                                />
                                                            </div>
                                                            {selectedToProtocol === item.name &&
                                                                selectedToProtocol !== "erc20" && (
                                                                    <div className="bg-backgound-100 text-font-200 rounded-lg p-3 my-1.5">
                                                                        <div className="w-full flex justify-start items-center gap-2 bg-font-100 rounded-md shadow py-1.5 px-5">
                                                                            <input
                                                                                type="text"
                                                                                value={filterToAddress}
                                                                                onChange={(e) =>
                                                                                    setFilterToAddress(e.target.value)
                                                                                }
                                                                                placeholder="Search by Token"
                                                                                className="w-full text-sm md:text-base outline-none placeholder-font-500 text-font-1100"
                                                                            />
                                                                            <AiOutlineSearch />
                                                                        </div>
                                                                        {item.tokenList.length > 0 &&
                                                                            item.tokenList?.map(
                                                                                (
                                                                                    token: tTradeProtocol,
                                                                                    tokenIndex: number
                                                                                ) => {
                                                                                    return token.name
                                                                                        .toLowerCase()
                                                                                        .includes(
                                                                                            filterToAddress.toLowerCase()
                                                                                        ) ? (
                                                                                        <div
                                                                                            key={tokenIndex}
                                                                                            onClick={() =>
                                                                                                onChangeToToken(
                                                                                                    token.name
                                                                                                )
                                                                                            }
                                                                                            className="w-full flex justify-start items-center gap-3 hover:bg-backgound-200 active:bg-backgound-100 py-2 px-3 rounded-lg cursor-pointer my-2"
                                                                                        >
                                                                                            {/* <Image
                                                                                                src={token.icon}
                                                                                                alt=""
                                                                                                className="h-7 w-7 bg-font-200 rounded-full cursor-pointer"
                                                                                            /> */}
                                                                                            {token.name}
                                                                                        </div>
                                                                                    ) : null;
                                                                                }
                                                                            )}
                                                                    </div>
                                                                )}
                                                            {item.name === "erc20" &&
                                                                selectedToProtocol === "erc20" &&
                                                                toTokensData && (
                                                                    <div className="bg-backgound-100 text-font-200 rounded-lg p-3 my-1.5">
                                                                        <div className="w-full flex justify-start items-center gap-2 bg-font-100 rounded-md shadow py-1.5 px-5">
                                                                            <input
                                                                                type="text"
                                                                                value={filterToAddress}
                                                                                onChange={(e) =>
                                                                                    setFilterToAddress(e.target.value)
                                                                                }
                                                                                placeholder="Search by Token"
                                                                                className="w-full text-sm md:text-base outline-none placeholder-font-500 text-font-1100"
                                                                            />
                                                                            <AiOutlineSearch />
                                                                        </div>
                                                                        {toTokensData?.map(
                                                                            (token: iTokenData, tokenIndex: number) => {
                                                                                return token.symbol
                                                                                    .toLowerCase()
                                                                                    .includes(
                                                                                        filterToAddress.toLowerCase()
                                                                                    ) ? (
                                                                                    <div
                                                                                        key={tokenIndex}
                                                                                        onClick={() =>
                                                                                            onChangeToToken(
                                                                                                token.symbol
                                                                                            )
                                                                                        }
                                                                                        className="w-full flex justify-start items-center gap-3  text-font-300 hover:text-font-100 hover:bg-backgound-200 active:bg-backgound-100 py-2 px-3 my-1 rounded-lg cursor-pointer"
                                                                                    >
                                                                                        <Image
                                                                                            src={
                                                                                                token.logoURI.includes(
                                                                                                    "s2.coinmarketcap.com"
                                                                                                )
                                                                                                    ? optimism
                                                                                                    : token.logoURI
                                                                                            }
                                                                                            alt=""
                                                                                            width={10}
                                                                                            height={10}
                                                                                            className="h-10 w-10 bg-font-200 rounded-full cursor-pointer"
                                                                                        />
                                                                                        {token.symbol}
                                                                                    </div>
                                                                                ) : null;
                                                                            }
                                                                        )}
                                                                    </div>
                                                                )}
                                                        </div>
                                                    ) : null;
                                                }
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full bg-backgound-300 flex flex-col gap-1 shadow shadow-backgound-800 rounded-2xl cursor-pointer">
                            <h1 className="w-full bg-backgound-300 text-font-100 text-lg md:text-xl lg:text-2xl text-center font-bold rounded-t-2xl p-5">
                                Building Batch No. {individualBatch.length}
                            </h1>
                            <div className="w-full flex flex-col gap-5 px-5 py-7">
                                <div
                                    className={`w-full relative flex justify-center items-center gap-5 ${
                                        selectedToNetwork.chainName &&
                                        selectedToProtocol &&
                                        selectedToToken &&
                                        selectedFromNetwork.chainName &&
                                        selectedFromProtocol &&
                                        selectedFromToken
                                            ? "flex-row"
                                            : "flex-col"
                                    }`}
                                >
                                    {/* ---------- FROM Section START ---------- */}
                                    <SelectionBar
                                        handleSelectionMenu={() => setShowFromSelectionMenu(true)}
                                        titlePlaceholder="From"
                                        iconCondition={selectedFromNetwork.chainName && selectedFromProtocol}
                                        mainIcon={selectedFromNetwork?.icon}
                                        subIcon={
                                            protocolNames[selectedFromNetwork.chainId]?.key.find(
                                                (entry: any) => entry.name == selectedFromProtocol
                                            )?.icon
                                        }
                                        valueCondition={selectedFromNetwork.chainName}
                                        valuePlaceholder="Select Chain and token"
                                        mainValue={selectedFromNetwork.key}
                                        firstSubValue={selectedFromProtocol}
                                        secondSubValue={selectedFromToken}
                                    />
                                    {/* ---------- FROM Section END ---------- */}

                                    <div
                                        onClick={handleSwap}
                                        className="absolute flex justify-center items-center border-2 bg-font-200 hover:bg-font-100 active:bg-font-400 rounded-full"
                                    >
                                        <Image
                                            src={swap}
                                            alt=""
                                            className={`h-10 w-10 p-2 ${
                                                selectedToNetwork.chainName &&
                                                selectedToProtocol &&
                                                selectedToToken &&
                                                selectedFromNetwork.chainName &&
                                                selectedFromProtocol &&
                                                selectedFromToken
                                                    ? "!rotate-90 h-9 w-9 p-1.5"
                                                    : "!rotate-0"
                                            }`}
                                        />
                                    </div>

                                    {/* ---------- To Section START ---------- */}
                                    <SelectionBar
                                        handleSelectionMenu={() => setShowToSelectionMenu(true)}
                                        titlePlaceholder="To"
                                        iconCondition={selectedToNetwork.chainName}
                                        mainIcon={selectedToNetwork?.icon}
                                        subIcon={
                                            protocolNames[selectedToNetwork.chainId]?.key.find(
                                                (entry: any) => entry.name == selectedToProtocol
                                            )?.icon
                                        }
                                        valueCondition={selectedToNetwork.chainName}
                                        valuePlaceholder="Select Chain and token"
                                        mainValue={selectedToNetwork.key}
                                        firstSubValue={selectedToProtocol}
                                        secondSubValue={selectedToToken}
                                    />
                                    {/* ---------- To Section END ---------- */}
                                </div>

                                {/* ---------- YOU PAY Section START ---------- */}
                                <div className="bg-backgound-100 border border-backgound-300 rounded-lg px-5 py-3">
                                    <h5 className="text-sm md:text-base lg:text-lg font-medium md:font-semibold text-font-100">
                                        You Pay
                                    </h5>
                                    <div className="relative flex flex-row justify-start items-center gap-8 py-3">
                                        {selectedFromNetwork.chainName && selectedFromProtocol ? (
                                            <div className="relative">
                                                <Image
                                                    src={selectedFromNetwork.icon}
                                                    alt=""
                                                    className="h-12 w-12 bg-backgound-300 rounded-full cursor-pointer"
                                                />
                                                <div className="absolute -bottom-1 -right-1 bg-backgound-100 h-6 w-6 flex justify-center items-center rounded-full">
                                                    <Image
                                                        src={
                                                            protocolNames[selectedFromNetwork.chainId].key.find(
                                                                (entry: any) => entry.name == selectedFromProtocol
                                                            )?.icon || defaultBlue
                                                        }
                                                        alt=""
                                                        className="h-5 w-5 bg-backgound-300 rounded-full cursor-pointer"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="relative">
                                                <div className="h-12 w-12 bg-backgound-300 rounded-full cursor-pointer" />
                                                <div className="absolute -bottom-1 -right-1 bg-backgound-100 h-6 w-6 flex justify-center items-center rounded-full">
                                                    <div className="h-5 w-5 bg-backgound-300 rounded-full cursor-pointer" />
                                                </div>
                                            </div>
                                        )}

                                        <div className="text-font-100">
                                            <input
                                                min="0"
                                                type="number"
                                                placeholder="0"
                                                value={
                                                    fromTokenDecimal && amountIn && bg(amountIn).isGreaterThan(0)
                                                        ? amountIn
                                                        : amountIn
                                                }
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    onChangeAmountIn(e.target.value)
                                                }
                                                className="w-full text-xl md:text-2xl text-white bg-backgound-100 placeholder:text-slate-200 font-bold outline-none"
                                            />
                                            <div className="text-xs md:text-sm text-font-300 font-medium">$0.00</div>
                                            <div className="absolute right-0 bottom-0 flex flex-col justify-center items-end gap-1">
                                                {maxBalance !== amountIn && maxBalance !== "0" ? (
                                                    <span
                                                        onClick={() =>
                                                            onChangeAmountIn(maxBalance ? maxBalance.toString() : "0")
                                                        }
                                                        className="text-xs md:text-sm text-font-100 font-medium bg-button-100 rounded-xl px-3 py-1"
                                                    >
                                                        Max
                                                    </span>
                                                ) : maxBalance == "0" ? (
                                                    <span className="text-xs md:text-sm text-font-100 font-medium bg-red-700 rounded-xl px-3 py-1">
                                                        No Balance
                                                    </span>
                                                ) : null}
                                                <span className="flex gap-2 text-xs md:text-sm text-font-300 font-semibold">
                                                    Balance:
                                                    {ismaxBalanceLoading ? (
                                                        <BiLoaderAlt className="animate-spin h-4 w-4" />
                                                    ) : (
                                                        <span className="text-font-400">
                                                            {maxBalance ? maxBalance : 0}{" "}
                                                            {selectedFromToken && selectedFromToken}
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ---------- YOU PAY Section END ---------- */}

                                {/* ---------- Add Batch o List START ---------- */}
                                {bg(maxBalance).isLessThan(amountIn) && (
                                    <>
                                        <div className="flex justify-start items-center gap-3 text-sm md:text-base font-medium bg-yellow-400 shadow rounded-lg px-5 py-2">
                                            <Image src={warning} alt="" className="h-8 w-8" />
                                            You don&#39;t have enough funds to complete transaction.
                                        </div>
                                        <div className="flex justify-start items-center gap-3 text-sm md:text-base font-medium bg-yellow-400 shadow rounded-lg px-5 py-2">
                                            <Image src={warning} alt="" className="h-8 w-8" />
                                            Please transfer the fund from EOA to Smart Account(SCW). To Transfer fund,
                                            click top right side.
                                        </div>
                                    </>
                                )}

                                <div className="w-full flex justify-center items-center gap-3">
                                    <Button
                                        handleClick={() => sendSingleBatchToList(true)}
                                        isLoading={addToBatchLoading}
                                        customStyle=""
                                        innerText="Add Batch to List"
                                    />
                                </div>

                                <div className="w-full flex justify-center items-center gap-3">
                                    <Button
                                        handleClick={() => handleExecuteMethod()}
                                        isLoading={sendTxLoading}
                                        customStyle=""
                                        innerText="Execute Batch"
                                    />
                                    {/* <Button
                                        handleClick={() => ExecuteAllBatches(true, "isAA")}
                                        isLoading={sendTxLoading}
                                        customStyle=""
                                        innerText="Execute Batch"
                                    /> */}
                                    {/* <Button
                                        handleClick={() => ExecuteAllBatches(true, "isERC20")}
                                        isLoading={sendTxLoading}
                                        customStyle=""
                                        innerText="Execute Batch via ERC20"
                                    /> */}
                                </div>

                                {/* <div className="w-full flex justify-center items-center gap-3">
                                    <Button
                                        handleClick={() => createSession(true)}
                                        isLoading={addToBatchLoading}
                                        customStyle=""
                                        innerText="Create Session"
                                    />
                                    <Button
                                        handleClick={() => erc20Transfer()}
                                        isLoading={addToBatchLoading}
                                        customStyle=""
                                        innerText="Transfer via session"
                                    />
                                </div> */}

                                {/* ---------- Add Batch o List Section END ---------- */}
                            </div>
                        </div>
                    )}
                </div>

                {showExecuteMethodModel && (
                    <ExecuteMethod
                        ExecuteAllBatches={ExecuteAllBatches}
                    />
                )}

                {showExecuteBatchModel && <ExecuteBatch />}

                {selectedFromNetwork.chainId && showBatchList && (
                    <div className="w-full md:max-w-2xl max-h-full bg-backgound-300 border border-backgound-600 shadow shadow-backgound-500 flex flex-col justify-start items-center gap-1 rounded-2xl cursor-pointer">
                        <h1 className="w-full bg-backgound-300 text-font-100 text-lg md:text-xl lg:text-2xl text-center font-bold rounded-t-2xl p-5">
                            Batching List
                        </h1>
                            {selectedFromNetwork.chainId && totalfees.gt(0) && (
                                <div className="w-auto flex justify-between items-center gap-10 sm:gap-40 border-2 border-gray-600 rounded-lg mb-3 px-4 py-2.5">
                                    <h3 className="flex justify-start items-center gap-1 text-font-100 font-bold text-xs md:text-sm">
                                        <Image
                                            src={gas}
                                            alt="gas"
                                            className="h-6 w-6 mr-1 sm:mr-2"
                                        />
                                        <span>
                                            Total Gas
                                        </span>
                                        <span className="text-font-300 font-medium text-xs">
                                            (estimated)
                                        </span>
                                    </h3>

                                    <div className="flex justify-between items-center gap-1">
                                        <h6 className="text-font-100 font-semibold text-sm">
                                            {Number(totalfees).toPrecision(4).toString()} :
                                            <span className="px-1 text-font-300 font-medium text-xs">
                                                {ChainIdDetails[selectedFromNetwork.chainId].gasFeesName}
                                            </span>
                                        </h6>
                                    </div>
                                </div>
                            )}

                        <div className="w-full max-h-full overflow-auto flex flex-col gap-5 px-5 py-7">
                            {selectedFromNetwork.chainId &&
                            individualBatch.length > 0 &&
                            individualBatch[0].txArray.length > 0 ? (
                                individualBatch.map((bar: any, inputBarIndex) => (
                                    <>
                                        {bar.txArray.length > 0 && (
                                            <div key={bar.id} className="relative">
                                                <div className="simulation-success flex flex-col justify-center items-start gap-1 bg-backgound-100 p-5 rounded-xl text-black font-medium transition duration-300">
                                                    <div className="w-full flex justify-between items-center gap-2">
                                                        <h1 className="flex justify-center items-center gap-3 text-font-100 font-semibold text-base">
                                                            {inputBarIndex + 1}.
                                                            <span>
                                                                {startCase(bar.data.fromNetwork)} To{" "}
                                                                {startCase(bar.data.toNetwork)}
                                                            </span>
                                                        </h1>
                                                        <MdDelete
                                                            color="red"
                                                            size="40px"
                                                            onClick={() => removeBatch(inputBarIndex)}
                                                            className="hover:bg-backgound-600 active:bg-backgound-400 p-2 rounded-full"
                                                        />
                                                    </div>
                                                    <div
                                                        className="w-full flex flex-col justify-between items-start gap-2 p-3 rounded-xl bg-backgound-300 shadow-sm mt-4"
                                                        onClick={() => toggleShowBatchList(bar.id)}
                                                    >
                                                        <div className="w-full flex justify-between items-center gap-2">
                                                            <div className="flex justify-start items-start gap-5">
                                                                <div className="relative">
                                                                    <Image
                                                                        src={
                                                                            ChainIdDetails[selectedFromNetwork.chainId]
                                                                                .networkLogo
                                                                        }
                                                                        alt=""
                                                                        className="h-10 w-10 bg-font-200 rounded-full cursor-pointer"
                                                                    />
                                                                    <div className="absolute -bottom-1 -right-1 bg-font-100 h-5 w-5 flex justify-center items-center rounded-full">
                                                                        <Image
                                                                            src={
                                                                                protocolNames[
                                                                                    selectedFromNetwork.chainId
                                                                                ].key.find(
                                                                                    (entry: any) =>
                                                                                        entry.name ==
                                                                                        bar.data.fromProtocol
                                                                                )?.icon || defaultBlue
                                                                            }
                                                                            alt=""
                                                                            className="h-4 w-4 bg-font-200 rounded-full cursor-pointer"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col justify-start items-start">
                                                                    <span className="text-lg md:text-xl lg:text-2xl font-bold text-font-100">
                                                                        {bar.data.amountIn} {bar.data.fromToken}
                                                                    </span>
                                                                    <span className="text-sm md:text-base font-semibold text-font-400">
                                                                        {bar.data.fromProtocol} on{" "}
                                                                        {bar.data.fromNetwork} {" ... "}
                                                                        {bar.data.toProtocol} on {bar.data.toNetwork}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-center items-center bg-backgound-500 hover:bg-backgound-100 rounded-full p-0.5">
                                                                {showIndividualBatchList === bar.id ? (
                                                                    <MdKeyboardArrowUp
                                                                        size="30px"
                                                                        className="text-font-500"
                                                                    />
                                                                ) : (
                                                                    <MdKeyboardArrowDown
                                                                        size="30px"
                                                                        className="text-font-500"
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                        {showIndividualBatchList === bar.id && (
                                                            <div className="flex flex-col justify-start items-start gap-1 pl-10 pt-3">
                                                                {bar.batchesFlow.length > 0 &&
                                                                    bar.batchesFlow.map((item: any, index: number) => (
                                                                        <div
                                                                            key={item.action}
                                                                            className="flex flex-col justify-start items-start gap-1"
                                                                        >
                                                                            <div
                                                                                key={item.action}
                                                                                className="flex justify-center items-center gap-3"
                                                                            >
                                                                                <div className="relative">
                                                                                    <Image
                                                                                        src={
                                                                                            ChainIdDetails[
                                                                                                item.fromChainId
                                                                                            ].networkLogo
                                                                                        }
                                                                                        alt=""
                                                                                        className="h-8 w-8 bg-slate-200 rounded-full cursor-pointer"
                                                                                    />
                                                                                    <div className="absolute -bottom-1 -right-1 bg-font-100 h-4 w-4 flex justify-center items-center rounded-full">
                                                                                        <Image
                                                                                            src={
                                                                                                protocolNames[
                                                                                                    item.fromChainId
                                                                                                ].key.find(
                                                                                                    (entry: any) =>
                                                                                                        entry.name ===
                                                                                                        item.protocol
                                                                                                )?.icon || defaultBlue
                                                                                            }
                                                                                            alt=""
                                                                                            className="h-3 w-3 bg-font-200 rounded-full cursor-pointer"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex flex-col justify-start items-start">
                                                                                    <span className="text-sm md:text-base font-semibold text-font-200 break-all">
                                                                                        {item.action} on {item.protocol}
                                                                                    </span>
                                                                                    <span className="text-xs md:text-sm font-semibold text-font-400">
                                                                                        {item.amount.toString()}{" "}
                                                                                        {item.tokenIn} for{" "}
                                                                                        {item.tokenOut}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            {bar.batchesFlow.length - 1 > index ? (
                                                                                <Image
                                                                                    src={downLine}
                                                                                    alt=""
                                                                                    className="h-8"
                                                                                />
                                                                            ) : (
                                                                                ""
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="w-full flex flex-col justify-center gap-1 rounded-lg px-2 mt-3">
                                                        <div className="w-full flex justify-between items-center gap-1">
                                                            <h3 className="w-full text-green-400 font-bold text-xs">
                                                                Gas Used
                                                            </h3>
                                                            <h6 className="w-full flex justify-end items-center gap-2 text-font-100 font-semibold text-sm">
                                                                <Image
                                                                    src={gas}
                                                                    alt="gas"
                                                                    className="h-4 w-4 mr-1"
                                                                />
                                                                <span>
                                                                    {Number(bar.data.fees).toPrecision(3).toString()} :
                                                                </span>
                                                                <span className="text-font-300 font-medium text-xs">
                                                                    {ChainIdDetails[selectedFromNetwork.chainId].gasFeesName}
                                                                </span>
                                                            </h6>
                                                        </div>
                                                        {Number(bar.data.extraValue) ? (
                                                            <div className="w-full flex justify-between items-center gap-1">
                                                                <h3 className="w-full text-green-400 font-bold text-xs">
                                                                    Extra Native Gas
                                                                </h3>
                                                                <h6 className="w-full flex justify-end items-center gap-2 text-font-100 font-semibold text-sm">
                                                                    <Image
                                                                        src={gas}
                                                                        alt="gas"
                                                                        className="h-4 w-4 mr-1"
                                                                    />
                                                                    <span>
                                                                        {Number(bar.data.extraValue).toPrecision(3).toString()} :
                                                                    </span>
                                                                    <span className="text-font-300 font-medium text-xs">
                                                                        {ChainIdDetails[selectedFromNetwork.chainId].gasFeesName}
                                                                    </span>
                                                                </h6>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                        {/* <div className="flex justify-center items-center gap-3">
                                                            {bar.simulation.isSuccess ? (
                                                                <h6 className="flex justify-center items-center gap-3 bg-font-100 text-font-1100 shadow-md font-medium text-sm rounded-full p-1 pr-5">
                                                                    <svg
                                                                        className="h-5 w-5 text-green-500"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        stroke-width="2"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                    >
                                                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                                        <polyline points="22 4 12 14.01 9 11.01" />
                                                                    </svg>
                                                                    Simulation Success
                                                                </h6>
                                                            ) : bar.simulation.isError ? (
                                                                <h6 className="flex justify-center items-center gap-3 bg-font-100 text-font-1100 shadow-md font-medium text-sm rounded-full p-1 pr-5">
                                                                    <svg
                                                                        className="h-5 w-5 text-red-500"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        stroke-width="2"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                    >
                                                                        <circle cx="12" cy="12" r="10" />{" "}
                                                                        <line x1="15" y1="9" x2="9" y2="15" />
                                                                        <line x1="9" y1="9" x2="15" y2="15" />
                                                                    </svg>
                                                                    Simulation Error
                                                                </h6>
                                                            ) : (
                                                                <h6 className="flex justify-center items-center gap-3 bg-font-100 text-font-1100 shadow-md font-medium text-sm rounded-full py-1 px-5">
                                                                    Simulation
                                                                </h6>
                                                            )}
                                                        </div> */}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ))
                            ) : (
                                <div className="text-center text-font-700 font-semibold text-base md:text-lg">
                                    {txhash ? "Last Batches executed, Now create new batches" : "No Batches Found !"}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Trade;
