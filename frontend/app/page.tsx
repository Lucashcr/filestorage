"use client"


import { toast } from "react-toastify";

export default function Home() {
  return (
    <>
      <button
        className="bg-primary px-6 py-3 rounded-full"
      >
        Upload file <span className="bg-accent p-2 rounded-full">0</span>
      </button>
      <button
        className="bg-secondary px-6 py-3 rounded-full"
      >
        Upload file
      </button>
      <button
        className="bg-accent px-6 py-3 rounded-full"
      >
        Upload file
      </button>
      <button
        className="bg-success px-6 py-3 rounded-full"
        onClick={() => {toast.success("Sucesso")}}
      >
        Upload file
      </button>
      <button
        className="bg-error px-6 py-3 rounded-full"
        onClick={() => {toast.error("Erro")}}
      >
        Upload file
      </button>
      <button
        className="bg-info px-6 py-3 rounded-full"
        onClick={() => {toast.info("Informação")}}
      >
        Upload file
      </button>
      <button
        className="bg-warning px-6 py-3 rounded-full"
        onClick={() => {toast.warning("Aviso")}}
      >
        Upload file
      </button>
    </>
  );
}
