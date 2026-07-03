import useWindowStore from "#store/window";
import React from "react";

const WindowConrtols = ({ target }) => {
  const { closeWindow, minimizeWindow } = useWindowStore();

  const stopControlClick = (action) => (event) => {
    event.stopPropagation();
    action();
  };

  return (
    <div id="window-controls">
      <button
        type="button"
        className="close"
        aria-label="Close window"
        onClick={stopControlClick(() => closeWindow(target))}
      />
      <button
        type="button"
        className="minimize"
        aria-label="Minimize window"
        onClick={stopControlClick(() => minimizeWindow(target))}
      />
      <button
        type="button"
        className="maximize"
        aria-label="Maximize window disabled"
        disabled
      />
    </div>
  );
};

export default WindowConrtols;
