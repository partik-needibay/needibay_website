import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import React from "react";
import Image from "@component/Image";
import Box from "@component/Box";
import "react-dropdown/style.css";
import { useState } from "react";
import styled from "styled-components";
import { getTheme } from "@utils/utils";
import { roboto } from "@utils/fonts";
import Dropdown from "react-dropdown";

const StyledDropDown = styled(Dropdown)`
  .dropdown-handler {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #dae1e7;
  }

  .arrow-open {
    background-image: url('<svg xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none">
  <path d="M4.9657 6.32388C4.56644 6.79231 3.84283 6.79231 3.44357 6.32387L0.236558 2.56123C-0.316792 1.91201 0.144576 0.912551 0.997622 0.912551L7.41165 0.912551C8.26469 0.912551 8.72606 1.91201 8.17271 2.56123L4.9657 6.32388Z" fill="black"/>
</svg>');
  }
`;

interface DropDownProps {
  options: any;
  onChange: any;
  value: any;
  label: any;
}

const DropDownButton: React.FC<DropDownProps> = ({
  label,
  options,
  onChange,
  value,
}) => {
  return (
    <Box
          width='100%'
          
      className='flexbox2'>
      <Typography
        color='#8D8A8A'
        mb={"6px"}>
        {label}
      </Typography>
      <StyledDropDown
        controlClassName='dropdown-handler'
              arrowClassName='arrow-open'
              menuClassName="menu"
        options={options}
        onChange={onChange}
        value={value}
        placeholder='Select an option'
      />
    </Box>
  );
};

export default DropDownButton;
