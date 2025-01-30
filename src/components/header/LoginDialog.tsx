import { cloneElement, FC, Fragment, ReactElement, useState } from "react";
import Modal from "../Modal";
import { useAppContext } from "@context/AppContext";

// ============================================================
type Props = { children: ReactElement };
// ============================================================

const LoginDialog: FC<Props> = ({ children }) => {

  const {state, dispatch} = useAppContext();

  const [open, setOpen] = useState(state.loginPopup);

  const toggleDialog = () => dispatch({type: "LOGIN_POPUP", payload: !state.loginPopup});

  return (
    <Fragment>
      <Modal open={state.loginPopup} onClose={toggleDialog}>
        {children}
      </Modal>
    </Fragment>
  );
};

export default LoginDialog;
