"use client";

import { useState } from "react";

import FilesGrid from "@/components/files/grid";
import FilesSwitcher from "@/components/files/switcher";
import FilesList from "@/components/files/list";
import FileType from "@/types/file";

type FilesRootProps = {
  files: FileType[];
};

export default function FilesRoot({ files }: FilesRootProps) {
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
