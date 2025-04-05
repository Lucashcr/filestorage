"use client";

import { useRef, useState } from "react";
import UploadFileDialogDropzone from "@/components/dialogs/file-upload/dropzone";
import { MdClose } from "react-icons/md";
import formatFileSize from "@/utils/format-file-size";

type UploadFileDialogBoxProps = {
  isOpen: boolean;
  onClose: () => void;
};

function getFilesCount(files: File[]) {
  if (files.length < 0) {
    return "Count error";
  }

  if (files.length == 1) {
    return "1 file selected";
  }

  return `${files.length} files selected`;
}

export default function UploadFileDialogBox({
  isOpen,
  onClose,
}: UploadFileDialogBoxProps) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  function handleChangeFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    setSelectedFiles(Array.from(event.target.files).concat(selectedFiles));
  }

  if (!isOpen) {
    setSelectedFiles([]);
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-background rounded-lg shadow-lg p-6 max-w-2xl w-full flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold">Upload file</h2>
        <UploadFileDialogDropzone
          files={selectedFiles}
          setFiles={setSelectedFiles}
        />
        <div className="flex flex-col items-center gap-3">
          <input
            type="file"
            ref={hiddenFileInput}
            style={{ display: "none" }}
            onChange={handleChangeFileInput}
            multiple
          />
          <div className="w-full flex items-center gap-2">
            <button
              className="bg-primary px-4 py-1 rounded-full hover:bg-accent"
              onClick={() => {
                if (!hiddenFileInput.current) return;
                hiddenFileInput.current.click();
              }}
            >
              Select
            </button>
            <span className="grow">{getFilesCount(selectedFiles)}</span>
            {/* <span className="hover:cursor-pointer hover:scale-[1.2]">
              <MdClose
                size={25}
                onClick={() => {
                  setSelectedFiles([]);
                }}
              />
            </span> */}
            <button
              className="bg-primary px-4 py-1 rounded-full hover:bg-accent"
              onClick={() => {
                setSelectedFiles([]);
              }}
            >
              Clear
            </button>
          </div>
          <div className="w-full">
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index} className="flex gap-2">
                  <span className="grow truncate">{file.name}</span>
                  <span className="text-nowrap">
                    {formatFileSize(file.size)}
                  </span>
                  <span className="hover:cursor-pointer hover:scale-[1.2]">
                    <MdClose
                      size={25}
                      onClick={() => {
                        setSelectedFiles(
                          selectedFiles.filter(f => f !== file)
                        )
                      }}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-secondary rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              selectedFiles.forEach((file) => {
                console.log(file);
              });
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
