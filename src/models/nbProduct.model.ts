import Media from "./media.model";

interface NbProduct {
    id: number,
    categoryId: number,
    productType: string,
    sku: string,
    productName: string,
    basePrice: number,
    baseCommission: number,
    baseCommissionType: string,
    tax_id: 1,
    isCustomizable: boolean,
    hasOption: boolean,
    isActive: boolean,
    media: Media[],
    productSlug: string,
    basePriceWithCommission: number | string,
    relatedProducts?: any,
    productDynamicPricing: any,
    isStoreVisible?: boolean,
    isSampleEnable?: boolean
}

export default NbProduct;
