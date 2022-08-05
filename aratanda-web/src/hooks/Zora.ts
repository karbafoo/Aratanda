import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";
import React from "react";

const networkInfo = {
    network: ZDKNetwork.Ethereum,
    chain: ZDKChain.Mainnet,
};

const API_ENDPOINT = "https://api.zora.co/graphql";
const args = {
    endPoint: API_ENDPOINT,
    networks: [networkInfo],
    apiKey: process.env.API_KEY,
};

const zdk = new ZDK(args); // All arguments are optional

export const useGetCollectionNFTs = ({
    address,
}: {
    address: string;
}): [boolean, ZoraNFT[]] => {
    const [collection, setColelction] = React.useState<ZoraNFT[]>([]);
    const [loading, setLoading] = React.useState(false);

    React.useMemo(async () => {
        setLoading(true);
        try {
            if (!address) {
                setColelction([]);
                setLoading(false);
            } else {
                const c = await zdk.tokens({
                    where: { collectionAddresses: [address] },
                });
                setColelction(
                    c.tokens.nodes.map((cc) => ({
                        collectionAddress: cc.token.collectionAddress,
                        tokenId: cc.token.tokenId,
                        image: {
                            mediaEncoding: cc.token.image?.mediaEncoding,
                            mimeType: cc.token.image?.mimeType,
                            url: cc.token.image?.url,
                        },
                        owner: cc.token.owner,
                    }))
                );
                setLoading(false);
            }
        } catch (err) {
            console.log("err", err);
            setColelction([]);
            setLoading(false);
        }
    }, [address]);
    return [loading, collection];
};
