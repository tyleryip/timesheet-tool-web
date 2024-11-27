import React from "react";
import Button from "../Button/Button";
import OutputTextBox from "../TextBoxes/OutputTextBox";
import InputTextBox from "../TextBoxes/InputTextBox";

export default function Layout() {
  return (
    <div className="bg-slate-200 grid place-items-center h-screen">
      <div className="grid-cols-3 space-x-20 flex items-center">
        <InputTextBox />
        <Button />
        <OutputTextBox />
      </div>
    </div>
  );
}
