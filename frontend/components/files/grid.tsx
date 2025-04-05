import FileType from "@/types/file";
import selectIconType from "@/utils/icon-type-selector";
import FileSizeFormatter from "./helpers/file-size-formatter";
import FileDownloadIcon from "./helpers/file-download-icon";

type FilesGridProps = {
  files: FileType[];
};

export default function FilesGrid({ files }: FilesGridProps) {
  return (
    <div className="w-full grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
      {files.map((file) => (
        <div
          className="min-w-[300px] bg-secondary flex items-center gap-2 p-3 rounded-lg select-none"
          key={file.id}
        >
          <div>{selectIconType(file.type)({ size: 30 })}</div>
          <div className="grow flex flex-col justify-center">
            <p className="text-md font-bold text-ellipsis">{file.title}</p>
            <FileSizeFormatter size={file.size} className="text-xs" />
          </div>
          <FileDownloadIcon file={file}/>
        </div>
      ))}
    </div>
  );
}
