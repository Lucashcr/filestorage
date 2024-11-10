import fileSizeFormatter from "@/components/files/helpers/formatters/file-size";
import FileType from "@/types/file";
import { IconType } from "react-icons";
import { MdAudiotrack, MdFilePresent, MdPictureAsPdf, MdFolder, MdImage, MdVideocam, MdTextSnippet } from "react-icons/md";

type FileInstanceProps = {
  data: FileType;
};

const iconSelector: Map<string, IconType> = new Map();
iconSelector.set("folder", MdFolder);
iconSelector.set("image", MdImage);
iconSelector.set("audio", MdAudiotrack);
iconSelector.set("video", MdVideocam);
iconSelector.set("document", MdPictureAsPdf);
iconSelector.set("text", MdTextSnippet);

export default function FileInstance({ data }: FileInstanceProps) {
  const iconComponent = iconSelector.get(data.type) || MdFilePresent;

  return (
    <div className="min-w-[300px] border flex items-center gap-1 p-3 rounded-lg select-none hover:cursor-pointer">
      <div>{iconComponent({ size: 35 })}</div>
      <div className="flex flex-col justify-center">
        <p className="text-md font-bold text-ellipsis">{data.title}</p>
        <p className="text-xs">{fileSizeFormatter(data.size)}</p>
      </div>
    </div>
  );
}
