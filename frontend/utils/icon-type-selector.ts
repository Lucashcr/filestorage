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
iconSelector.set("image", MdImage);
iconSelector.set("audio", MdAudiotrack);
iconSelector.set("video", MdVideocam);
iconSelector.set("document", MdPictureAsPdf);
iconSelector.set("text", MdTextSnippet);

export default function selectIconType(type: string): IconType {
  return iconSelector.get(type) || MdFilePresent;
}