import React from "react";
import Contracts from "./contracts.json";
//@ts-ignore
const myweb3: any = new Web3(window.ethereum);
const gigaContract = new myweb3.eth.Contract(Contracts.GigaNFT.abi, "");
export const useGetChannels = (tokenId: number) => {
    const [channels, setchannels] = React.useState<any[][]>([]);
    const [loading, setloading] = React.useState<boolean>(false);
    const [err, seterr] = React.useState<any>(null);
    React.useMemo(async () => {
        setchannels([]);
        setloading(true);
        seterr(null);
        try {
            const c = await gigaContract.methods.channelsOf(tokenId).call();

            setchannels(c);
            setloading(false);
            seterr(null);
        } catch (err) {
            console.log("err", err);
            setchannels([]);
            setloading(false);
            seterr(err);
        }
    }, [tokenId]);
    return [channels, loading, err];
};
