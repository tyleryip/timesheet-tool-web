import React from "react";
import { ReactComponent as CopyIcon } from "../../assets/copy.svg";
import { useAppSelector } from "../../store/hooks";
import { selectOutput } from "../../store/slices/timesheetSlice";
import { copyButtonTooltip } from "../../constants/Strings";
import { useSnackbar } from "react-simple-snackbar";

export default function CopyIconButton() {
  const [openSnackbar] = useSnackbar({ position: "top-right" });

  const output = useAppSelector(selectOutput);

  function handleClick(e: any) {
    e.preventDefault();
    if (output.length !== 0) {
      openSnackbar("Copied to clipboard!", 3000);
      navigator.clipboard.writeText(output);
    }
  }

  return (
    <button
      className="disabled:fill-slate-300 fill-slate-700 hover:fill-blue-700 h-6 w-6 md:w-7 md:h-7 p-0.5 mt-2 self-end"
      onClick={(e) => handleClick(e)}
      title={copyButtonTooltip}
      disabled={output.length === 0}
    >
      <CopyIcon />
    </button>
  );
}
