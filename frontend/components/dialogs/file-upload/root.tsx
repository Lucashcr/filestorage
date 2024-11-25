"use client";

import { useState } from "react";
import UploadFileDialogButton from "@/components/dialogs/file-upload/button";
import UploadFileDialogBox from "@/components/dialogs/file-upload/box";

export default function UploadFileDialogRoot() {
  const [isOpen, setIsOpen] = useState(false);

  return <>
    <UploadFileDialogButton onClick={() => {setIsOpen(true)}} />
    {isOpen && <UploadFileDialogBox isOpen onClose={() => {setIsOpen(false)}} />}
  </>
}