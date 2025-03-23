import React, { useState } from "react";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";

type Props = {
  text: string;
  onChange: (text: string) => void;
};

export default (props: Props) => {
  return (
    <MdEditor
      value={props.text}
      onChange={props.onChange}
      theme="dark"
      language="en-US"
    />
  );
};
