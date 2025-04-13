"use client";

import { Dispatch, SetStateAction } from "react";
import ConfirmDeleteDialogBox from "./box";
import FileType from "@/types/file";

type Props = {
  file: FileType | null;
  setFileToDelete: Dispatch<SetStateAction<FileType | null>>;
};

export default function ConfirmDeleteDialogRoot({ file, setFileToDelete }: Props) {
  if (!file) return;

  return (
    <ConfirmDeleteDialogBox
      file={file}
      onClose={() => {
        setFileToDelete(null)
      }}
    ></ConfirmDeleteDialogBox>
  );
}
