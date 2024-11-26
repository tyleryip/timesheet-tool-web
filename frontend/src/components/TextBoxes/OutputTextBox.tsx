import React from "react";
import TextBox from "./TextBox";
import { useAppSelector } from "../../store/hooks";
import { selectOutput } from "../../store/slices/timesheetSlice";
import { outputLabel, outputPlaceholder } from "../../constants/Strings";

export default function OutputTextBox() {
  const output = useAppSelector(selectOutput)

  return (<TextBox label={outputLabel} placeholder={outputPlaceholder} content={output}></TextBox>);
}
