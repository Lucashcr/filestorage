import Link from "next/link";
import SideBar from "./sidebar";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-zinc-500 to-zinc-600 text-white p-4 text-center flex justify-between">
      <div className="flex items-center gap-4">
        <SideBar />
        <h1 className="text-xl font-bold">FileStorage</h1>
      </div>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}