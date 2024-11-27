import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setOutput, selectInput } from "../../store/slices/timesheetSlice";
import { parseButtonString } from "../../constants/Strings";

export default function Button() {
  const dispatch = useAppDispatch();

  const input = useAppSelector(selectInput);

  function handleClick(e: any) {
    e.preventDefault();
    // TODO: add toggle for total time
    dispatch(setOutput(false));
  }

  return (
    <button
      className="bg-zinc-700 text-white text-center font-bold py-2 px-4 mx-1 my-1 rounded"
      disabled={input.length === 0}
      onClick={handleClick}
    >
      {parseButtonString}
    </button>
  );
}
