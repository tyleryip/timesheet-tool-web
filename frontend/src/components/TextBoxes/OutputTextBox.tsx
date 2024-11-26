import React from "react";

export default function OutputTextBox({ content }: { content: string }) {
  return <textarea readOnly rows={20} cols={50} value={content}></textarea>;
}
