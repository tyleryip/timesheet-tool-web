import React from "react";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearInput, selectInput } from "../../store/slices/timesheetSlice";
import { clearButtonTooltip } from "../../constants/Strings";

export default function ClearIconButton() {
  const dispatch = useAppDispatch();

  const input = useAppSelector(selectInput);

  function handleClick(e: any) {
    e.preventDefault();

    if (input.length !== 0) {
      dispatch(clearInput());
    }
  }

  return (
    <button
      className="disabled:fill-slate-300 fill-slate-700 hover:fill-red-600 w-6 h-6 md:w-7 md:h-7 p-0.5 mt-2 self-end"
      onClick={(e) => handleClick(e)}
      title={clearButtonTooltip}
      disabled={input.length === 0}
    >
      <DeleteIcon />
    </button>
  );
}
