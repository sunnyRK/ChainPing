import { iUserTokenInfo } from "../../../store/Portfolio";

export type tPortfolio = {
    isUsersTokenLoading: boolean
    smartAccountAddress: string;
    userTokensData: iUserTokenInfo[];
    filteredDefiTokens: iUserTokenInfo[][];
    handleFetchPorfolioData: () => void;
    totalNetWorth: number
};