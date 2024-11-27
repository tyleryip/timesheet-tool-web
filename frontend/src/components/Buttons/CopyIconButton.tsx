import React from "react";
import { ReactComponent as CopyIcon } from "../../assets/copy.svg";
import { useAppSelector } from "../../store/hooks";
import { selectOutput } from "../../store/slices/timesheetSlice";
import { copyButtonTooltip } from "../../constants/Strings";

export default function CopyIconButton() {
  const output = useAppSelector(selectOutput);

  function handleClick(e: any) {
    e.preventDefault();
    if (output.length !== 0) {
      navigator.clipboard.writeText(output);
    }
  }

  return (
    <button
      className="w-5 h-5 p-0.5 self-end"
      onClick={(e) => handleClick(e)}
      title={copyButtonTooltip}
      disabled={output.length === 0}
    >
      <CopyIcon />
    </button>
  );
}
