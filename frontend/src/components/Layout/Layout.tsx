import React from "react";
import Button from "../Button/Button";
import OutputTextBox from "../TextBoxes/OutputTextBox";
import InputTextBox from "../TextBoxes/InputTextBox";

var text = `Task-123 (4.25 hours)

Standup (0.25 hours)

Call with Bob (0.25 hours)

Addressing PR Feedback (2.0 hours)

Desk Check with Nancy (0.25 hours)

Task-493 (0.25 hours)

Task-495 (0.75 hours)

Task-650 (0.25 hours)`;

export default function Layout() {
  return (
    <div className="bg-slate-200 grid place-items-center h-screen">
      <div className="grid-cols-3 space-x-20 flex items-center">
        <InputTextBox content={text} />
        <Button />
        <OutputTextBox content={text} />
      </div>
    </div>
  );
}
