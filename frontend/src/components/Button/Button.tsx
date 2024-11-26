import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { parseInput } from "../../store/slices/timesheetSlice";
import { parseButtonString } from "../../constants/Strings";

export default function Button() {
  const dispatch = useAppDispatch();

  function handleClick(e: any) {
    e.preventDefault();
    dispatch(parseInput());
  }

  return (
    <button
      className="bg-zinc-700 text-white text-center font-bold py-2 px-4 mx-1 my-1 rounded"
      onClick={handleClick}
    >
      {parseButtonString}
    </button>
  );
}
