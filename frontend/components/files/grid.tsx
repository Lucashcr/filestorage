import FileType from "@/types/file";
import selectIconType from "./helpers/icon-type-selector";
import fileSizeFormatter from "./helpers/file-size-formatter";

type FilesGridProps = {
  files: FileType[];
};

export default function FilesGrid({ files }: FilesGridProps) {
  return (
    <div className="w-full grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
      {files.map((file) => (
        <div
          className="min-w-[300px] bg-secondary flex items-center gap-1 p-3 rounded-lg select-none hover:cursor-pointer hover:bg-accent transition duration-[300ms]"
          key={file.id}
        >
          <div>{selectIconType(file.type)({ size: 35 })}</div>
          <div className="flex flex-col justify-center">
            <p className="text-md font-bold text-ellipsis">{file.title}</p>
            <p className="text-xs">{fileSizeFormatter(file.size)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
