import useWindowStore from "#store/window";
import React from "react";

const WindowConrtols = ({ target }) => {
  const { closeWindow } = useWindowStore();
  return (
    <div id="window-controls">
      <div className="close" onClick={()=> closeWindow(target)} />
      <div className="minimize" />
      <div className="maximize" />
    </div>
  );
};

export default WindowConrtols;
