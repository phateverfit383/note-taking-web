import { MdEditor, MdPreview } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

type MarkdownEditorProps = {
  children?: React.ReactNode;
  text: string;
  onChange?: (text: string) => void;
  isPreview?: boolean;
};

const MarkdownEditor = React.forwardRef<HTMLButtonElement, MarkdownEditorProps>(
  ({ children, text, onChange, isPreview }, ref) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);
    if (!isMounted) {
      return <div>Loading editor...</div>;
    }
    if (isPreview) {
      return (
        <div className="w-full h-full">
          <MdPreview
            value={text}
            theme="dark"
            language="en-US"
            className="p-4"
          />
        </div>
      );
    }
    return (
      <div className="w-full h-full">
        <MdEditor
          value={text}
          onChange={onChange}
          theme="dark"
          language="en-US"
        />

        {children}
      </div>
    );
  }
);

export default MarkdownEditor;
