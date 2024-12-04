"use client";

import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, use, useState } from "react";

import apiClient from "@/services/api";

const SECONDS_PER_HOUR = 3600;

type LoginPageProps = {
  searchParams: Promise<{ next: string | undefined }>;
};

export default function LoginPage(props: LoginPageProps) {
  const searchParams = use(props.searchParams);

  const setCookie = useCookies()[1];
  const router = useRouter();

  const [formData, setFormData] = useState({email: "", password: ""});

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await apiClient.post("/auth/login", formData);
      const responseData = response.data;

      const options = {
        maxAge: 24 * SECONDS_PER_HOUR,
        path: "/"
      };
      setCookie("authToken", responseData.token, options);

      toast.success("Usuário logado com sucesso!");
      router.push(searchParams.next || "/");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao tentar fazer login");
    }
  };

  return (
    <div className="grow flex flex-col items-center justify-center">
      <div className="w-[400px] bg-secondary p-6 rounded-xl shadow flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Entrar</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmitForm}>
          <fieldset>
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              className="w-full bg-gray-700 px-4 py-2 rounded-lg bg-gray-700"
              placeholder="Email"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
          </fieldset>
          <fieldset>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              className="w-full bg-gray-700 px-4 py-2 rounded-lg"
              placeholder="Senha"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
          </fieldset>
          <button
            type="submit"
            className="bg-primary py-2 rounded-full hover:bg-accent"
          >
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
}
