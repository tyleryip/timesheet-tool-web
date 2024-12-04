import React from "react";
import TextBox from "./TextBox/TextBox";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectInput, selectErrors } from "../../store/slices/timesheetSlice";
import { setInput, validateInput } from "../../store/slices/timesheetSlice";
import {
  getErrorMessage,
  inputLabel,
  inputPlaceholder,
} from "../../constants/Strings";
import ClearIconButton from "../Buttons/ClearIconButton";

export default function InputTextBox() {
  const dispatch = useAppDispatch();

  const input = useAppSelector(selectInput);
  const errors = useAppSelector(selectErrors);

  // Error message and rendering
  const showErrorMessage = errors.length > 0 ? "" : "invisible";
  const errorMessage = errors.length > 0 ? getErrorMessage(errors[0]) : "";
  const border = errors.length > 0 ? "border-2 border-rose-600" : "";

  return (
    <div className="h-full w-full max-w-128 flex flex-col">
      <p className="text-center text-sm md:text-base mb-1 font-semibold">
        {inputLabel}
      </p>
      <div className={`${border} grow flex flex-col bg-white rounded-lg p-2`}>
        <TextBox
          placeholder={inputPlaceholder}
          content={input}
          readonly={false}
          onChangeHandler={(e: string) => dispatch(setInput(e))}
          onBlurHandler={() => dispatch(validateInput())}
        />
        <div className="flex flex-row">
          <div className="flex-none invisible">spacer</div>
          <p
            className={`${showErrorMessage} text-rose-600 grow text-center self-center text-sm md:text-base`}
          >
            {errorMessage}
          </p>
          <div className="flex-none">
            <ClearIconButton />
          </div>
        </div>
      </div>
    </div>
  );
}
