import React from "react";
import TextBox from "./TextBox";
import { useAppSelector } from "../../store/hooks";
import { selectOutput } from "../../store/slices/timesheetSlice";
import { outputLabel, outputPlaceholder } from "../../constants/Strings";
import CopyIconButton from "../Buttons/CopyIconButton";

export default function OutputTextBox() {
  const output = useAppSelector(selectOutput);

  return (
    <div>
      <p className="text-center pb-2">{outputLabel}</p>
      <div className="flex flex-col w-64 h-64 bg-white rounded-lg p-2">
        <TextBox placeholder={outputPlaceholder} content={output} />
        <CopyIconButton />
      </div>
    </div>
  );
}
