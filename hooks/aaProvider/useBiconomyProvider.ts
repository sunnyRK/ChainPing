import { useMutation } from "@tanstack/react-query";
import { useAppStore } from "../../store/appStore";
import { _functionType, _nonce } from "../../utils/constants";
import { toast } from "react-hot-toast";

export function useBiconomyProvider() {
    const { smartAccount, setSendtxLoading, setTxHash }: any = useAppStore((state) => state);

    async function sendToBiconomy(txs) {
        try {
            // const txResponseOfBiconomyAA = await smartAccount?.sendTransactionBatch({transactions: txs,})
            // const txReciept = await txResponseOfBiconomyAA?.wait()
            // console.log("userOp hash", txResponseOfBiconomyAA?.hash)
            // console.log("Tx hash", txReciept?.transactionHash)

            const userOp = await smartAccount.buildUserOp(txs);
            userOp.paymasterAndData = "0x";
            console.log("userOp: ", userOp);

            const userOpResponse = await smartAccount.sendUserOp(userOp);
            console.log("userOp hash: ", userOpResponse);

            const txReciept = await userOpResponse.wait();
            console.log("Tx hash: ", txReciept?.receipt.transactionHash);

            setTxHash(txReciept?.receipt.transactionHash);
            setSendtxLoading(false);
        } catch (error: any) {
            setSendtxLoading(false);
            console.log("sendToBiconomy-error: ", error);
            if (error.message) {
                toast.error(error.message);
            } else {
                toast.error(error);
            }
            return;
        }
    }
    return useMutation(sendToBiconomy);
}
