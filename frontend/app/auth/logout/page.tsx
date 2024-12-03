"use client";

import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const removeCookie = useCookies()[2];
  const router = useRouter();

  async function handleSubmitForm() {
    removeCookie("authToken", {path: "/"});
    toast.success("Usuário deslogado com sucesso!");
    router.push("/auth/login");
  }

  return (
    <div className="grow flex flex-col items-center justify-center">
      <div className="w-[400px] bg-secondary p-6 rounded-xl shadow flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Tem certeza de que deseja sair?</h1>
        <form className="flex flex-col gap-4" action={handleSubmitForm}>
          <input
            type="submit"
            className="bg-primary py-2 rounded-full hover:bg-accent"
            value="Confirmar"
          />
        </form>
      </div>
    </div>
  );
}
