import FileType from "@/types/file";
import fileSizeFormatter from "./helpers/file-size-formatter";
import selectIconType from "./helpers/icon-type-selector";

type FilesListProps = {
  files: FileType[];
};

export default function FilesList({ files }: FilesListProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      {files.map((file) => (
        <div
          className="w-full bg-secondary px-4 py-2 rounded-full flex items-center gap-4 hover:cursor-pointer hover:bg-accent transition duration-[300ms]"
          key={file.id}
        >
          <div>{selectIconType(file.type)({ size: 40 })}</div>
          <p className="grow">{file.title}</p>
          <p>{fileSizeFormatter(file.size)}</p>
        </div>
      ))}
    </div>
  );
}
