"use client";

import { useEffect, useState } from "react";

import FilesGrid from "@/components/files/grid";
import FilesSwitcher from "@/components/files/switcher";
import FilesList from "@/components/files/list";
import { useFilesListContext } from "@/contexts/files-list";
import apiClient from "@/services/api";
import ConfirmDeleteDialogRoot from "@/components/dialogs/confirm-delete/root";
import FileType from "@/types/file";

export default function FilesRoot() {
  const { files, setFiles } = useFilesListContext();
  useEffect(() => {
    apiClient.get("/files").then((response) => {
      setFiles(response.data);
    });
  }, [setFiles]);

  const [layout, setLayout] = useState("grid");
  const [fileToDelete, setFileToDelete] = useState<FileType | null>(null);

  const listComponent = (
    <FilesList files={files} setFileToDelete={setFileToDelete} />
  );
  const gridComponent = (
    <FilesGrid files={files} setFileToDelete={setFileToDelete} />
  );

  return (
    <div className="w-full flex flex-col gap-2">
      <FilesSwitcher layout={layout} setLayout={setLayout} />
      {layout == "list" ? listComponent : gridComponent}
      <ConfirmDeleteDialogRoot
        file={fileToDelete}
        setFileToDelete={setFileToDelete}
      ></ConfirmDeleteDialogRoot>
    </div>
  );
}
