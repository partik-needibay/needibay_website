interface Service {
  image: string;
  id: string;
  icon: string;
  title: string;
  description?: string;
  categoryName?: string;
  categorySlug?: string;
  metaTitle?: string;
  metaDescription?: string;
  mediaPath?: string;
  isStoreVisible?: any,
  categoryImages?: any,
  subCategories?: any,
  parentCategoryId?: any
}

export default Service;
