import { useState, useEffect } from "react";

import "./bottomFixedSpinner.scss";

function BottomFixedSpinner({ dataIsSending, label }) {
  const [display, setDisplay] = useState("hidden-element");

  useEffect(() => {
    let timerId = null;
    if (dataIsSending) {
      timerId = setTimeout(() => {
        setDisplay("appeared-flex");
      }, 100);
    } else {
      setDisplay("hidden-element");
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [dataIsSending]);

  return (
    <div className={`bottom-fixed-spinner ${display}`}>
      <h2 className="bottom-fixed-spinner__headline">{label}</h2>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default BottomFixedSpinner;
