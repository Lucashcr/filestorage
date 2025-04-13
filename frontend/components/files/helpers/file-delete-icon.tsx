import { MdDelete } from "react-icons/md";

import FileType from "@/types/file";
import { Dispatch, SetStateAction } from "react";

type FileDeleteIconProps = {
  file: FileType;
  setFileToDelete: Dispatch<SetStateAction<FileType | null>>;
};

export default function FileDeleteIcon({ file, setFileToDelete }: FileDeleteIconProps) {
  async function onClickHandler() {
    setFileToDelete(file);
  }
  return (
    <div className="p-2 rounded-full hover:cursor-pointer hover:bg-accent transition duration-[300ms]">
      <MdDelete size={25} onClick={onClickHandler} />
    </div>
  );
}
