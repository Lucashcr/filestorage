import formatFileSize from "@/utils/format-file-size";

type FileSizeFormatterProps = {
  size: number;
  className: string;
};

export default function FileSizeFormatter({
  size,
  className,
}: FileSizeFormatterProps) {
  return (
    <p className={className}>{formatFileSize(size)}</p>
  );
}
