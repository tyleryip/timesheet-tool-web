import React from "react";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";

export default function Header() {
  return (
    <div className="flex justify-center items-center gap-x-2">
      <ClockIcon className="h-14 w-14" />
      <div>
        <h1 className="text-5xl italic font-medium">OhSheet!</h1>
        <h2 className="text-xs italic font-medium">The Timesheet Tool</h2>
      </div>
    </div>
  );
}
