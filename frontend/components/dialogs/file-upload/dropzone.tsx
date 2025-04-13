import { Dispatch, SetStateAction } from "react";
import { MdBackup } from "react-icons/md";

type UploadFileDialogDropzoneProps = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}

export default function UploadFileDialogDropzone({
  files,
  setFiles
}: UploadFileDialogDropzoneProps) {
  return (
    <div
      className="flex justify-center items-center py-8 border border-dashed rounded"
      onDragEnter={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onDragOver={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onDrop={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setFiles(Array.from(event.dataTransfer.files).concat(files))
      }}
    >
      <MdBackup size={80} />
    </div>
  );
}
