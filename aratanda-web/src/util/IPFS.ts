export const getIPFS = (img?: ZoraMedia | null) => {
    return img?.mediaEncoding?.thumbnail || "";
};
