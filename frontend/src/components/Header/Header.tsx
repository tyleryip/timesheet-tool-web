import React from "react";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";

export default function Header() {
  return (
    <div className="flex justify-center items-center gap-x-1 md:gap-x-2">
      <ClockIcon className="h-11 w-11 md:h-14 md:w-14" />
      <div>
        <h1 className="text-3xl md:text-5xl italic font-medium">OhSheet!</h1>
        <h2 className="text-xs italic font-medium">The Timesheet Tool</h2>
      </div>
    </div>
  );
}
