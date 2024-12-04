"use client";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import apiClient from "@/services/api";
import PasswordValidator from "@/services/password-validator";
import EmailValidator from "@/services/email-validator";

type RegisterFormData = {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    firstName: "",
  });

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = PasswordValidator.validate(formData.password);
    if (message) {
      toast.error(message);
      return;
    }

    const validEmail = EmailValidator.validate(formData.email);
    if (!validEmail) {
      toast.error("Email inválido!");
      return;
    }

    try {
      await apiClient.post("/auth/register", formData);
      toast.success("Usuário registrado com sucesso!");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      toast.error(
        "Erro ao tentar registrar usuário! Verifique os dados enviados."
      );
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
              name="firstName"
              id="firstName"
              value={formData.firstName}
              className="w-full bg-gray-700 px-4 py-2 rounded-lg"
              placeholder="Nome"
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
              }}
            />
          </fieldset>
          <fieldset>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              className="w-full bg-gray-700 px-4 py-2 rounded-lg"
              placeholder="Sobrenome (Opcional)"
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });
              }}
            />
          </fieldset>
          <fieldset>
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              className="w-full bg-gray-700 px-4 py-2 rounded-lg"
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
