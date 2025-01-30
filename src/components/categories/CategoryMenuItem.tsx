import { FC, useEffect } from "react";
import Link from "next/link";
import Icon from "@component/icon/Icon";
import { StyledCategoryMenuItem } from "./styles";
import Image from "@component/Image";
import { StringIterator } from "lodash";

const CategoryMenuItem = (props) => {
  const {
    href,
    icon,
    title,
    caret = true,
    children,
    mediaPath,
    categoryImages,
  } = props;

/*   const renderImageCategoryImageSource = (categoryImages) => {
    debugger;
    let categoryImageArray: any = [];
    if (categoryImages?.length > 0) {
      categoryImages?.map((item) => {
        if(item.pageBlockCode == "DESKTOP_CATEGORY_NAV_DROPDOWN"){
          categoryImageArray.push(item)
        }
      });
    }
    return categoryImageArray[0];
  };

  useEffect(() => {
    renderImageCategoryImageSource(categoryImages)
  }, [categoryImages]) */

  return (
    <StyledCategoryMenuItem>
      <Link href={href}>
        <div className="category-dropdown-link">
          {/* {icon && <Icon variant="small">{icon}</Icon>} */}
          <Image
            marginTop={"0rem"}
            alt="category"
            width={30}
            borderRadius={2}
            src={
              mediaPath
                ? (mediaPath as string)
                : "https://placehold.co/30x30/B48BFF/FFF"
            }
          />
          <span className="title">{title}</span>
          {caret && <Icon variant="small">chevron-right</Icon>}
        </div>
      </Link>

      {children}
    </StyledCategoryMenuItem>
  );
};

export default CategoryMenuItem;
