import React from "react";
import ParseIconButton from "../Buttons/ParseIconButton";
import OutputTextBox from "../TextBoxes/OutputTextBox";
import InputTextBox from "../TextBoxes/InputTextBox";
import Header from "../Header/Header";

export default function Layout() {
  return (
    <div className="bg-slate-200 h-dvh grid grid-rows-12">
      <div className="row-span-1 my-2 md:my-8">
        <Header />
      </div>
      <div className="row-span-11 flex flex-row items-center justify-center h-full w-full pt-4 pb-10 md:pb-16 px-4 md:px-8 gap-x-2 md:gap-x-8">
        <InputTextBox />
        <div className="flex flex-col gap-y-10 justify-center items-center">
          <ParseIconButton />
        </div>
        <OutputTextBox />
      </div>
    </div>
  );
}
