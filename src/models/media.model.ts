interface Media {
    id: number,
    attributeId: number,
    product: number,
    value: string,
    mediaPath: string,
    mediaType: string,
    sort?: number,
    displaySize?: string
}

export default Media;
