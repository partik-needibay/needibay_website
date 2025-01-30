interface NbCartItem {
    rowTotalQty: any;
    isSampleQty: any;
    productSlug: string;
    minOrderQty?: any;
    qty: number;
    productName: string;
    productId?:any;
    slug?: string;
    price?: any;
    imgUrl?: string;
    rowTotal?: number,
    productImageDefault: string;
    cart?: number;
    id: string | number;
};

export default NbCartItem;
