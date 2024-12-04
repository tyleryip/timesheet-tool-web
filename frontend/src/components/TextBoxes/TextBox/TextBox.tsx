import React from "react";
import "./TextBox.css";

interface TextBoxProps {
  placeholder?: string;
  content: string;
  readonly?: boolean;
  spellCheck?: boolean;
  hideCaret?: boolean;
  onChangeHandler?: Function;
  onBlurHandler?: Function;
}

export default function TextBox({
  placeholder,
  content,
  readonly = false,
  spellCheck = true,
  hideCaret = false,
  onChangeHandler = () => {},
  onBlurHandler = () => {},
}: TextBoxProps) {
  const textboxClass = hideCaret ? "readonly" : "";

  return (
    <textarea
      className={`text-sm md:text-base h-full w-full p-1 textbox ${textboxClass}`}
      placeholder={placeholder}
      readOnly={readonly}
      onChange={(e) => onChangeHandler(e.target.value)}
      onBlur={(e) => onBlurHandler(e.target.value)}
      value={content}
      spellCheck={spellCheck}
    ></textarea>
  );
}
