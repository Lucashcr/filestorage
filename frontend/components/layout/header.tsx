import { MdBackup } from "react-icons/md";

export default function Header() {
  return (
    <header className="bg-primary text-white px-6 py-4 flex justify-start items-center">
      <div className="flex items-center gap-4">
        <MdBackup size={35} />
        <h1 className="text-xl font-bold">FileStorage</h1>
      </div>
    </header>
  );
}