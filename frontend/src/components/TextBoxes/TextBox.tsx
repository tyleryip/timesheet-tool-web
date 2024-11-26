import React from "react";
import "./TextBox.css"

interface TextBoxProps {
    label?: string,
    placeholder?: string,
    content: string,
    readonly?: boolean,
    onChangeHandler?: Function
}

export default function TextBox({ label, placeholder, content, readonly = false, onChangeHandler = () => { } }: TextBoxProps) {
    return (<div>
        <p className="text-center mb-2">{label}</p>
        <textarea
            className="textbox rounded p-2"
            placeholder={placeholder}
            readOnly={readonly}
            onChange={(e) => onChangeHandler(e.target.value)}
            rows={20}
            cols={50}
            value={content}>
        </textarea></div>);
}
