"use client";
import { ButtonHTMLAttributes, FC } from "react";
import { SpaceProps } from "styled-system";
import { colorOptions } from "../../interfaces";
import StyledIcon from "./styles";

export interface IconProps {
  size?: string;
  children: string;
  transform?: string;
  home?: boolean;
  color?: colorOptions;
  variant?:
    | "small"
    | "medium"
    | "large"
    | "xsmall"
    | "xxsmall"
    | "xlarge"
    | "customxsmall";
  defaultcolor?: "currentColor" | "auto";
}

type ComponentProps = IconProps & SpaceProps & ButtonHTMLAttributes<IconProps>;

const Icon: FC<ComponentProps> = ({
  variant = "medium",
  defaultcolor = "currentColor",
  home,
  children,
  ...props
}) => {
  return (
    // @ts-ignore
    <StyledIcon
      src={`/assets/images/icons/${children}.svg`}
      fallback={() => <span>{children?.trim()}</span>}
      variant={variant}
      defaultcolor="currentColor"
      {...props}
    />
  );
};

export default Icon;
