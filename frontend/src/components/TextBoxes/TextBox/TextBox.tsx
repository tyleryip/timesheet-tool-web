import React from "react";
import "./TextBox.css";

interface TextBoxProps {
  placeholder?: string;
  content: string;
  readonly?: boolean;
  onChangeHandler?: Function;
}

export default function TextBox({
  placeholder,
  content,
  readonly = false,
  onChangeHandler = () => {},
}: TextBoxProps) {
  return (
    <textarea
      className="textbox flex-1 p-1"
      placeholder={placeholder}
      readOnly={readonly}
      onChange={(e) => onChangeHandler(e.target.value)}
      value={content}
    ></textarea>
  );
}
