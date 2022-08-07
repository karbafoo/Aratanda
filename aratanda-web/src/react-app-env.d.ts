/// <reference types="react-scripts" />
type ZoraMedia = {
    mediaEncoding: any;
    mimeType?: string | null;
    url?: string | null;
};

type ZoraNFT = {
    owner?: string | null;
    collectionAddress?: string | null;
    tokenId?: string | null;
    image?: ZoraMedia | null;
};

type GigaPost = {
    id: number;
};
