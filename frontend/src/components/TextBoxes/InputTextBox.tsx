import React from "react";
import TextBox from "./TextBox";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectInput } from "../../store/slices/timesheetSlice";
import { setInput } from "../../store/slices/timesheetSlice";
import { inputLabel, inputPlaceholder } from "../../constants/Strings";

export default function InputTextBox() {
  const dispatch = useAppDispatch();

  const input = useAppSelector(selectInput);

  return (
    <div>
      <TextBox
        label={inputLabel}
        placeholder={inputPlaceholder}
        content={input}
        readonly={false}
        onChangeHandler={(e: string) => dispatch(setInput(e))}
      ></TextBox>
    </div>
  );
}
