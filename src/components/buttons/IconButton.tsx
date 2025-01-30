"use client";
import Box from "@component/Box";
import {
  color,
  space,
  border,
  layout,
  shadow,
  compose,
  variant,
  ColorProps,
  SpaceProps,
  BorderProps,
  BackgroundProps,
  backgroundImage,
  backgroundColor,
} from "styled-system";
import { useState } from "react";
import styled from "styled-components";
import systemCss from "@styled-system/css";
import { forwardRef } from "react";
import Typography from "@component/Typography";
import { sans } from "@utils/fonts";
import HelpModal from "@component/header/HelpModal";
interface IconButtonProps {
  help?: string;
  title?: boolean;
  blink?: true;
  size?: "xsmall" | "small" | "medium" | "large" | "none";
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "error" | "default" | string;
}

type BubbleProps = {
  isHovered: boolean;
};
type Props = ColorProps &
  BackgroundProps &
  BorderProps &
  SpaceProps &
  IconButtonProps;


const Bubble = styled.div<BubbleProps>`
  width: 10rem;
  background: #6B6969;
  position: relative;
  color: #fff;
  text-align: center;
  border-radius: 0.3rem;
  visibility: ${(props) => (props.isHovered ? "visible" : "hidden")};
  color: #fff;
  text-align: center;
  padding: 5px;
  left: -2.8rem;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  top: 3rem;
  &::after {
    content: "";
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: #6B6969;
    position: absolute;
    top: -1rem; 
    left: calc(50% - 0.5rem);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%); 
  }}
`;

const StyledIconButton = styled.button<Props>(
  (props) =>
    props.blink &&
    systemCss({
      transition: "none !important",
      animation: "blink 1.7s infinite",
      "@keyframes blink": {
        "0%": { opacity: 1, bg: "white", fill: "#8992A5"},
        "50%": { opacity: 1, bg: "#B48BFF", fill: "#fff" },
        "100%": { opacity: 1,bg: "white",fill: "#8992A5"},
      },
    }),

  (props) =>
    systemCss({
      "&:hover": {
        visibility: "visible",
        opacity: 1,
      },
      outline: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "1rem",
      borderRadius: "50%",
      // filter: `${props.blink ? "drop-shadow(0px 0px 4px #B48BFF)" : "none"}`,
      padding: "1rem",
      fontWeight: 600,
      bg: "body.paper",
      transition: "none !important",
      "&:disabled": { bg: "text.disabled", color: "text.muted" },
    }),
  (props) =>
    variant({
      prop: "variant",
      variants: {
        text: { border: "none", color: `${props.color}.main` },
        outlined: {
          color: `${props.color}.main`,
          border: "2px solid",
          borderColor: `${props.color}.main`,
          "&:focus": {
            boxShadow: `0px 1px 4px 0px ${
              props.theme.colors[props.color as any]?.main
            }`,
          },
        },
        contained: {
          border: "none",
          color: `${props.color}.text`,
          bg: `${props.color}.main`,
          "&:hover": { bg: `${props.color}.main` },
          "&:focus": {
            boxShadow: `0px 1px 4px 0px ${
              props.theme.colors[props.color as any]?.main
            }`,
          },
        },
      },
    }),
  variant({
    prop: "size",
    variants: {
      large: { padding: "1.25rem" },
      medium: { padding: "1rem" },
      small: { padding: "0.75rem", fontSize: 14 },
      xsmall: { padding: "0.5rem", fontSize: 12 },
    },
  }),
  compose(color, layout, space, border, shadow)
);

interface BtnProps extends Props {
  children: React.ReactNode;
  as?: string | React.ComponentType<any>;
}

const IconButton = forwardRef<
  HTMLButtonElement,
  BtnProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, help, title, size = "small", ...props }, ref) => {
  const [isHovered, setIsHovered] = useState(false);


  return (
    <>
      <StyledIconButton
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        size={size}
        {...props}>
        {children}
      </StyledIconButton>
      <>
        {title && (
          <Bubble isHovered={isHovered}>
            <Typography
              className={sans.className}
              color='#ffffffb3'>
              Complete your profile
            </Typography>
          </Bubble>
        )}
      </>

    </>
  );
});

export default IconButton;
