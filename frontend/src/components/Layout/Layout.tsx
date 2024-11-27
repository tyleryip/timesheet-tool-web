import React from "react";
import ParseButton from "../Buttons/ParseButton";
import OutputTextBox from "../TextBoxes/OutputTextBox";
import InputTextBox from "../TextBoxes/InputTextBox";

export default function Layout() {
  return (
    <div className="bg-slate-200 grid place-items-center h-screen">
      <div className="grid-cols-3 space-x-20 flex items-center">
        <InputTextBox />
        <ParseButton />
        <OutputTextBox />
      </div>
    </div>
  );
}
