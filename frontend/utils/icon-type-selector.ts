import { IconType } from "react-icons";
import {
  MdAudiotrack,
  MdFilePresent,
  MdFolder,
  MdImage,
  MdPictureAsPdf,
  MdTextSnippet,
  MdVideocam,
} from "react-icons/md";

const iconSelector: Map<string, IconType> = new Map();
iconSelector.set("folder", MdFolder);
iconSelector.set("image/jpeg", MdImage);
iconSelector.set("image/png", MdImage);
iconSelector.set("audio", MdAudiotrack);
iconSelector.set("video/mp4", MdVideocam);
iconSelector.set("application/pdf", MdPictureAsPdf);
iconSelector.set("text/markdown", MdTextSnippet);
iconSelector.set("application/vnd.openxmlformats-officedocument.wordprocessingml.document", MdTextSnippet);

export default function selectIconType(type: string): IconType {
  return iconSelector.get(type) || MdFilePresent;
}