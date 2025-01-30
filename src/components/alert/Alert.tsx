import * as React from 'react';
import { FC, ReactNode } from "react";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import styled from "styled-components";
import { types } from 'util';

type Props = any;

const CancelBtn = styled(IconButton)({
    border: "1px solid #C2ABED",
    color: "#672DD1",
    padding: "0.3rem",
    ":hover": {
      backgroundColor: "#ff3838",
      color: "whitesmoke",
    },
  });

const TransitionAlerts: FC<Props> = ({ isActive, message, type }) => {
  const [open, setOpen] = React.useState(isActive);
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
            severity={type}
            action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                    setOpen(false);
                }}
                >
                <CancelBtn />
                </IconButton>
            }
            sx={{ mb: 2 }}
            >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
}

export default TransitionAlerts;
