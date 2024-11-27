import React from "react";
import TextBox from "./TextBox";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectInput } from "../../store/slices/timesheetSlice";
import { setInput } from "../../store/slices/timesheetSlice";
import { inputLabel, inputPlaceholder } from "../../constants/Strings";
import ClearIconButton from "../Buttons/ClearIconButton";

export default function InputTextBox() {
  const dispatch = useAppDispatch();

  const input = useAppSelector(selectInput);

  return (
    <div>
      <p className="text-center mb-2">{inputLabel}</p>
      <div className="flex flex-col w-64 h-64 bg-white rounded-lg p-2 items-start">
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
