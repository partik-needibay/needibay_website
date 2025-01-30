import { cloneElement, FC, ReactElement } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import FlexBox from "./FlexBox";

// styled component
const StyledModal = styled(FlexBox)<{ open?: boolean; help?: boolean }>(
  ({ open, help }) => ({
    inset: 0,
    zIndex: 999,
    height: "100%",
    position: "fixed",
    alignItems: "center",
    flexDirection: "column",
    opacity: open ? 1 : 0,
    visibility: open ? "visible" : "hidden",
    background: open ? "rgba(0, 0, 0, 0.6)" : "transparent",
    transition: "all 200ms",
    // border: "2px solid",
    justifyContent: "center",
    "& .container": {
      top: help ? "50%" : "0%",
      width: "100%",
      overflow: "auto",
      position: "relative",
      // transform: help ? "translateY(50%)" : "translateY(20%) translateX(27%)",
    },
  })
);

// ===============================================================
type ModalProps = {
  open?: boolean;
  help?: boolean;
  onClose?: () => void;
  children?: ReactElement;
};
// ===============================================================

const VerficationModal: FC<ModalProps> = ({
  children,
  open = false,
  onClose,
}) => {
  const handleModalContentClick = (e: any) => {
    e.stopPropagation();
  };

  const handleBackdropClick = () => {
    if (onClose) onClose();
  };

  if (globalThis.document && open) {
    let modal = document.querySelector("#modal-root");

    if (!modal) {
      modal = document.createElement("div");
      modal.setAttribute("id", "modal-root");
      document.body.appendChild(modal);
    }

    return createPortal(
      <StyledModal
        open={open}
        alignItems="center"
        flexDirection="column"
        onClick={handleBackdropClick}
      >
        <div className="container">
          <FlexBox justifyContent="center" m="0.5rem">
            {children &&
              cloneElement(children, { onClick: handleModalContentClick })}
          </FlexBox>
        </div>
      </StyledModal>,
      modal
    );
  }

  return null;
};

export default VerficationModal;
