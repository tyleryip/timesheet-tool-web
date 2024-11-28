import React from "react";
import "./TextBox.css";

interface TextBoxProps {
  placeholder?: string;
  content: string;
  readonly?: boolean;
  spellCheck?: boolean;
  onChangeHandler?: Function;
}

export default function TextBox({
  placeholder,
  content,
  readonly = false,
  spellCheck = true,
  onChangeHandler = () => {},
}: TextBoxProps) {
  return (
    <textarea
      className="textbox h-full w-full p-1"
      placeholder={placeholder}
      readOnly={readonly}
      onChange={(e) => onChangeHandler(e.target.value)}
      value={content}
      spellCheck={spellCheck}
    ></textarea>
  );
}
