"use client";

import FilesRoot from "@/components/files/root";
import UploadFileDialog from "@/components/dialogs/file-upload/root";
import { useEffect, useState } from "react";
import apiClient from "@/services/api";
import { AxiosResponse } from "axios";
import FileType from "@/types/file";

export default function Home() {
  const [files, setFiles] = useState<FileType[]>([]);

  useEffect(() => {
    apiClient.get("/files").then((response: AxiosResponse) => {
      setFiles(response.data);
    })
  }, [])

  return (
    <>
      <div className="w-full flex justify-end mb-4">
        <UploadFileDialog />
      </div>
      <FilesRoot files={files} />
    </>
  );
}
