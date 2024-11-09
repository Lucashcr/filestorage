"use client";

import React, { useMemo } from "react";
import { toast } from "react-toastify";

type UploadButtonProps = {
  chilren?: typeof React.Children;
  className?: string;
};

function onClickHandler() {
  toast("OK!");
}

export default function UploadButton(props: UploadButtonProps) {
  const cls = useMemo(() => {
    let cls = `bg-primary px-6 py-3 rounded-full`;
    if (cls) {
      cls += ` ${props.className}`;
    }
    return cls;
  }, [props.className]);
  return (
    <button className={cls} onClick={onClickHandler}>
      Upload file
    </button>
  );
}
