import React from "react";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast() {
  const [show, hide] = useState(true);

  useEffect(() => {
    const notify = () => toast("Fetching the Model Do not Close", {
      autoClose: 10000
  });

    notify();
  }, [])

  return (
    <div>
      <ToastContainer />
    </div>
  );
}
