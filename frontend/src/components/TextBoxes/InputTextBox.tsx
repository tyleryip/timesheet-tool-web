import React from "react";
import TextBox from "./TextBox/TextBox";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectInput } from "../../store/slices/timesheetSlice";
import { setInput } from "../../store/slices/timesheetSlice";
import { inputLabel, inputPlaceholder } from "../../constants/Strings";
import ClearIconButton from "../Buttons/ClearIconButton";

export default function InputTextBox() {
  const dispatch = useAppDispatch();

  const input = useAppSelector(selectInput);

  return (
    <div className="h-full w-full max-w-128 flex flex-col">
      <p className="text-center mb-2">{inputLabel}</p>
      <div className="grow flex flex-col bg-white rounded-lg p-2 items-start">
        <TextBox
          placeholder={inputPlaceholder}
          content={input}
          readonly={false}
          onChangeHandler={(e: string) => dispatch(setInput(e))}
        />
        <ClearIconButton />
      </div>
    </div>
  );
}
