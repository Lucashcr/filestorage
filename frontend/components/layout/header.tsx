"use client";

import { MdBackup } from "react-icons/md";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const cookies = useCookies()[0];

  const [logActionTitle, setLogActionTitle] = useState("Entrar");
  const [logActionHref, setLogActionHref] = useState("/auth/login");

  useEffect(() => {
    if (cookies.authToken) {
      setLogActionTitle("Sair");
      setLogActionHref("/auth/logout");
    } else {
      setLogActionTitle("Entrar");
      setLogActionHref("/auth/login");
    }
  }, [cookies.authToken]);

  return (
    <header className="bg-primary text-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <MdBackup size={35} />
        <h1 className="text-xl font-bold">FileStorage</h1>
      </div>
      <div className="flex gap-2">
        <Link
          href="/"
          className="px-4 py-1 rounded-full hover:bg-accent transition duration-[200ms]"
        >
          Arquivos
        </Link>
        <Link
          href={logActionHref}
          className="px-4 py-1 rounded-full hover:bg-accent transition duration-[200ms]"
        >
          {logActionTitle}
        </Link>
      </div>
    </header>
  );
}
