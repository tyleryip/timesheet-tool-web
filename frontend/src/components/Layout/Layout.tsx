import React from "react";
import ParseButton from "../Buttons/ParseButton";
import OutputTextBox from "../TextBoxes/OutputTextBox";
import InputTextBox from "../TextBoxes/InputTextBox";
import Header from "../Header/Header";
import Arrow from "../Arrow/Arrow";

export default function Layout() {
  return (
    <div className="bg-slate-200 h-screen grid grid-rows-12">
      <div className="row-span-1 p-4 my-4">
        <Header />
      </div>
      <div className="row-span-11 flex flex-row items-center justify-center h-full w-full p-8 gap-x-8">
        <InputTextBox />
        <div className="flex flex-col gap-y-10 justify-center items-center">
          <Arrow />
          <ParseButton />
        </div>
        <OutputTextBox />
      </div>
    </div>
  );
}
