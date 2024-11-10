import FileInstance from "@/components/files/instance";
import FileType from "@/types/file";


type FilesContainerProps = {
  files: FileType[];
};

export default function FilesContainer({ files }: FilesContainerProps) {
  return (
    <div className="w-full grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {files.map((file) => (
        <FileInstance data={file} key={file.id} />
      ))}
    </div>
  );
}
