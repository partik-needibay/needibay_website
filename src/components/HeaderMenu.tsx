import { cloneElement, FC, useEffect, useRef, useState } from "react";
import styled, { CSSProperties } from "styled-components";
import { variant } from "styled-system";
import systemCss from "@styled-system/css";
import { themeGet } from "@styled-system/theme-get";

interface MenuProps {
  handler: any;
  children: any;
  className?: string;
  style?: CSSProperties;
  direction?: "left" | "right";
}

const StyledHeaderMenu = styled.div<{ direction: string }>(
  systemCss({
    position: "relative",
    ".menu-item-holder": {
      zIndex: 100,
      minWidth: "200px",
      borderRadius: "6px",
      paddingTop: "0.5rem",
      position: "absolute",
      paddingBottom: "0.5rem",
      top: "calc(100% + 0.5rem)",
    },
  }),
  variant({
    prop: "direction",
    variants: {
      left: { ".menu-item-holder": { left: 0, right: "auto" } },
      right: { ".menu-item-holder": { left: "auto", right: 0 } },
    },
  })
);

const HeaderMenu: FC<MenuProps> = ({
  handler,
  children,
  direction = "left",
  ...props
}) => {
  const [show, setShow] = useState(false);
  const menuRef = useRef(null);

  const togglePopover = (e: any) => {
    e.stopPropagation();
    setShow(!show);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("click", handleDocumentClick);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  return (
    <StyledHeaderMenu
      ref={menuRef}
      direction={direction as "left" | "right"}
      {...props}>
      {cloneElement(handler, { onClick: togglePopover })}
      {show && <div className='menu-item-holder'>{children}</div>}
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
