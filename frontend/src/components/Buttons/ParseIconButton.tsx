import React from "react";
import { ReactComponent as ArrowIcon } from "../../assets/right-arrow.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setOutput,
  selectInput,
  selectOutput,
} from "../../store/slices/timesheetSlice";
import { parseButtonTooltip } from "../../constants/Strings";

export default function ParseIconButton() {
  const dispatch = useAppDispatch();

  const input = useAppSelector(selectInput);
  const output = useAppSelector(selectOutput);

  function handleClick(e: any) {
    e.preventDefault();
    // TODO: add toggle for total time
    dispatch(setOutput(false));
  }

  const fill =
    input.length === 0 || output.length !== 0
      ? "fill-slate-300"
      : "fill-slate-600";

  const animation =
    input.length > 0 && output.length === 0 ? "animate-pulse" : "";

  return (
    <button
      className="disabled:cursor-not-allowed"
      disabled={input.length === 0}
      onClick={handleClick}
      title={parseButtonTooltip}
    >
      <ArrowIcon className={`w-14 h-14 ${fill} ${animation}`}></ArrowIcon>
    </button>
  );
}
