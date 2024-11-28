import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setOutput, selectInput } from "../../store/slices/timesheetSlice";
import { parseButtonString, parseButtonTooltip } from "../../constants/Strings";

export default function ParseButton() {
  const dispatch = useAppDispatch();

  const input = useAppSelector(selectInput);

  function handleClick(e: any) {
    e.preventDefault();
    // TODO: add toggle for total time
    dispatch(setOutput(false));
  }

  return (
    <button
      className="bg-slate-600 hover:bg-slate-800 
      disabled:bg-slate-300 disabled:cursor-not-allowed 
      text-white text-center font-bold 
      py-2 px-4 mx-4 
      rounded"
      disabled={input.length === 0}
      onClick={handleClick}
      title={parseButtonTooltip}
    >
      {parseButtonString}
    </button>
  );
}
