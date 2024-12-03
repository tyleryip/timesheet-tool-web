import React from "react";
import TextBox from "./TextBox/TextBox";
import { useAppSelector } from "../../store/hooks";
import {
  getHoursString,
  selectInput,
  selectOutput,
  selectTotalTime,
} from "../../store/slices/timesheetSlice";
import {
  outputLabel,
  outputPlaceholder,
  totalTimeLabel,
} from "../../constants/Strings";
import CopyIconButton from "../Buttons/CopyIconButton";

export default function OutputTextBox() {
  const input = useAppSelector(selectInput);
  const output = useAppSelector(selectOutput);
  const totalTime = useAppSelector(selectTotalTime) ?? 0;

  const totalTimeLabelValue = totalTimeLabel.replace(
    "{totalTime}",
    getHoursString(totalTime)
  );

  // Only render total time label if it is non-zero
  const showTotalTime = totalTime > 0 ? "" : "invisible";

  return (
    <div className="h-full w-full max-w-128 flex flex-col">
      <p className="text-center text-sm md:text-base mb-1 font-semibold">
        {outputLabel}
      </p>
      <div className="grow flex flex-col bg-white rounded-lg p-2">
        <TextBox
          placeholder={input.length > 0 ? outputPlaceholder : ""}
          content={output}
          spellCheck={false}
          hideCaret={true}
        />
        <div className="flex flex-row">
          <div className="flex-none invisible">spacer</div>
          <p
            className={`${showTotalTime} grow text-center self-center text-sm md:text-base`}
          >
            {totalTimeLabelValue}
          </p>
          <div className="flex-none">
            <CopyIconButton />
          </div>
        </div>
      </div>
    </div>
  );
}
