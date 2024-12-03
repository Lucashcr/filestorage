"use client";

import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

import apiService from "@/services/api";
import { use } from "react";

const SECONDS_PER_HOUR = 3600;

type LoginPageProps = {
  searchParams: Promise<{ next: string | undefined }>;
};

export default function LoginPage(props: LoginPageProps) {
  const searchParams = use(props.searchParams);

  const setCookie = useCookies()[1];
  const router = useRouter();

  async function handleSubmitForm(data: FormData) {
    const email = data.get("email");
    const password = data.get("password");

    try {
      const requestData = { email, password };
      const response = await apiService.post("/auth/login", requestData);
      const responseData = response.data;

      const cookieOptions = {
        maxAge: 24 * SECONDS_PER_HOUR,
        path: "/",
      };
      setCookie("authToken", responseData.token, cookieOptions);

      toast.success("Usuário logado com sucesso!");
      router.push(searchParams.next || "/");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao tentar fazer login");
    }
  }

  return (
    <div className="grow flex flex-col items-center justify-center">
      <div className="w-[400px] bg-secondary p-6 rounded-xl shadow flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Entrar</h1>
        <form className="flex flex-col gap-4" action={handleSubmitForm}>
          <fieldset>
            <input
              type="text"
              name="email"
              id="email"
              className="w-full bg-gray-700 px-4 py-2 rounded-lg bg-gray-700"
              placeholder="Email"
            />
          </fieldset>
          <fieldset>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full bg-gray-700 px-4 py-2 rounded-lg"
              placeholder="Password"
            />
          </fieldset>
          <input
            type="submit"
            value="Confirmar"
            className="bg-primary py-2 rounded-full hover:bg-accent"
          />
        </form>
      </div>
    </div>
  );
}
