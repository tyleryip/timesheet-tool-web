import React from "react";
import { ReactComponent as ArrowIcon } from "../../assets/right-arrow.svg";
import { useAppSelector } from "../../store/hooks";
import { selectInput } from "../../store/slices/timesheetSlice";

export default function Arrow() {
  const input = useAppSelector(selectInput);

  const fill = input.length === 0 ? "fill-slate-300" : "fill-slate-600";
  return <ArrowIcon className={`${fill} w-14 h-14`}></ArrowIcon>;
}
