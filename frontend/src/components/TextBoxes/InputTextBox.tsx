import React from "react";

export default function InputTextBox({ content }: { content: string }) {
  return <textarea className="" rows={20} cols={50} value={content}></textarea>;
}
