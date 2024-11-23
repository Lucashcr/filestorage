import { Dispatch, SetStateAction } from "react";
import { MdGridView, MdList } from "react-icons/md";

type FilesSwitcherProps = {
  layout: string;
  setLayout: Dispatch<SetStateAction<string>>;
};

export default function FilesSwitcher({
  layout,
  setLayout,
}: FilesSwitcherProps) {
  const listIcon = (
    <MdList
      size={45}
      className="bg-secondary p-3 rounded-full hover:cursor-pointer hover:bg-primary"
      onClick={() => {setLayout("list")}}
    />
  );
  const gridIcon = (
    <MdGridView
      size={45}
      className="bg-secondary p-3 rounded-full hover:cursor-pointer hover:bg-primary"
      onClick={() => {setLayout("grid")}}
    />
  );
  return (
    <div className="flex rounded-full justify-end">
      {layout == "list" ? gridIcon : listIcon}
    </div>
  );
}
