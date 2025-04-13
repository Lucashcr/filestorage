"use client";

import { useFilesListContext } from "@/contexts/files-list";
import handleDeleteFile from "@/services/file-deleter";
import FileType from "@/types/file";

type Props = {
  file: FileType;
  onClose: () => void;
};

export default function ConfirmDeleteDialogBox({ file, onClose }: Props) {
  const { removeFile } = useFilesListContext();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-background rounded-lg shadow-lg p-6 max-w-2xl w-full flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold">Delete file</h2>
        <p>Tem certeza que deseja excluir o arquivo: <strong>{file.title}</strong></p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-secondary rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleDeleteFile(file, removeFile);
              onClose();
            }}
            className="px-4 py-2 bg-primary rounded hover:bg-accent"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
