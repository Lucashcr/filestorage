"use client";

import FilesRoot from "@/components/files/root";
import UploadFileDialog from "@/components/dialogs/file-upload/root";
import { FilesListProvider } from "@/contexts/files-list";

export default function Home() {
  return (
    <FilesListProvider>
      <div className="w-full flex justify-end mb-4">
        <UploadFileDialog />
      </div>
      <FilesRoot />
    </FilesListProvider>
  );
}
