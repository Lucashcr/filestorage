'use client';

import Link from "next/link";
import { useState } from "react";


export default function SideBar() {
  const [show, setShow] = useState(false);
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 hover:cursor-pointer hover:scale-125 transition duration-400 ease-in-out"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={() => setShow(true)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
      <nav className="md:block fixed top-0 left-0 w-[300px] h-full bg-zinc-600 text-white p-4 text-center transition duration-150 ease-in-out" style={{ display: show ? "block" : "none" }}>
        <button
          className="absolute top-4 right-4 hover:cursor-pointer hover:scale-125 transition duration-400 ease-in-out"
          onClick={() => setShow(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 hover:cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <ul className="flex flex-col gap-4">
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
    </>
  );
}
