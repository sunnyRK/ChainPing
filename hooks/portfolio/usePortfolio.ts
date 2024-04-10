import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { iPortfolio, usePortfolioStore } from "../../store/Portfolio";
import { chains } from "../../modules/portfolio/constants";

export function usePortfolio() {
    const { chainId, setChainData, setIsLoading, setError }: iPortfolio = usePortfolioStore((state) => state);

    async function fetchPortfolio(address: string) {
        try {
            setIsLoading(true);
            const authToken = process.env.NEXT_PUBLIC_ZERION_API_KEY;

            let requests;
            if (chainId) {
                // Fetch data for a specific chain if chainId is provided
                const chain = chains.find((c) => c.chainId === chainId);
                if (!chain) {
                    throw new Error(`Chain with ID ${chainId} not found.`);
                }
                const response = await axios.get(
                    `https://api.zerion.io/v1/wallets/${address}/positions/?filter[positions]=no_filter&currency=usd&filter[chain_ids]=${chain.chainName.toLowerCase()}&filter[trash]=only_non_trash&sort=value`,
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Basic ${authToken}`,
                        },
                    }
                );
                requests = [{ chainId, data: response.data.data }];
            } else {
                // Fetch data for all chains if chainId is not provided
                requests = await Promise.all(
                    chains.map(async ({ chainName, chainId }) => {
                        const response = await axios.get(
                            `https://api.zerion.io/v1/wallets/${address}/positions/?filter[positions]=no_filter&currency=usd&filter[chain_ids]=${chainName.toLowerCase()}&filter[trash]=only_non_trash&sort=value`,
                            {
                                headers: {
                                    Accept: "application/json",
                                    Authorization: `Basic ${authToken}`,
                                },
                            }
                        );
                        return { chainId, data: response.data.data };
                    })
                );
            }
            // Storing the array of req results of portfolio into chainData: { chainId, data }
            setChainData(requests);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Error fetching data");
        } finally {
            setIsLoading(false);
        }
    }

    return useMutation(fetchPortfolio);
}
