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

    dispatch(clearInput());
  }

  return (
    <button
      className="w-5 h-5 p-0.5 self-end"
      onClick={(e) => handleClick(e)}
      title={clearButtonTooltip}
      disabled={input.length === 0}
    >
      <DeleteIcon />
    </button>
  );
}