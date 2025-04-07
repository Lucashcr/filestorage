"use client";

import { useEffect, useState } from "react";

import FilesGrid from "@/components/files/grid";
import FilesSwitcher from "@/components/files/switcher";
import FilesList from "@/components/files/list";
import { useFilesListContext } from "@/contexts/files-list";
import apiClient from "@/services/api";

export default function FilesRoot() {
  const { files, setFiles } = useFilesListContext();
  useEffect(() => {
    apiClient.get("/files").then((response) => {
      setFiles(response.data);
    });
  }, [setFiles]);

  const [layout, setLayout] = useState("grid");

  const listComponent = <FilesList files={files} />;
  const gridComponent = <FilesGrid files={files} />;

  return (
    <div className="w-full flex flex-col gap-2">
      <FilesSwitcher layout={layout} setLayout={setLayout} />
      {layout == "list" ? listComponent : gridComponent}
    </div>
  );
}
