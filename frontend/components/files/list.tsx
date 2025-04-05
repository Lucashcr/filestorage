import FileType from "@/types/file";
import FileSizeFormatter from "./helpers/file-size-formatter";
import selectIconType from "@/utils/icon-type-selector";
import FileDownloadIcon from "./helpers/file-download-icon";

type FilesListProps = {
  files: FileType[];
};

export default function FilesList({ files }: FilesListProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      {files.map((file) => (
        <div
          className="w-full bg-secondary px-4 py-2 rounded-full flex items-center gap-4"
          key={file.id}
        >
          <div>{selectIconType(file.type)({ size: 30 })}</div>
          <p className="grow">{file.title}</p>
          <FileSizeFormatter size={file.size} className="text-sm" />
          <FileDownloadIcon file={file} />
        </div>
      ))}
    </div>
  );
}
