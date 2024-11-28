import React from "react";
import ParseButton from "../Buttons/ParseButton";
import OutputTextBox from "../TextBoxes/OutputTextBox";
import InputTextBox from "../TextBoxes/InputTextBox";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="bg-slate-200 h-screen grid grid-rows-12">
      <div className="row-span-2 p-4">
        <Header />
      </div>
      <div className="row-span-8 flex flex-row items-center justify-center h-full w-full p-8 gap-x-8">
        <InputTextBox />
        <OutputTextBox />
      </div>
      <div className="row-span-2 text-center flex items-center justify-center">
        <ParseButton />
      </div>
    </div>
  );
}
