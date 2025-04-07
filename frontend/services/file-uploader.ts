import apiClient from "@/services/api";
import axios from "axios";
import { toast } from "react-toastify";

export default async function handleUploadFile(files: File[]) {
  for (const file of files) {
    const data = { filename: file.name };
    const response = await apiClient.post("/bucket/generate-upload-url", data);

    if (response.status !== 200 || !response.data?.url) {
      toast.error(`Falha ao tentar enviar arquivo: ${file.name}`);
      continue;
    }

    const uploadResponse = await axios.put(response.data.url, file);

    if (uploadResponse.status !== 200) {
      toast.error(`Falha ao tentar enviar arquivo: ${file.name}`);
      continue;
    }

    const fileToSave = {
      type: file.type,
      title: file.name,
      path: "/",
      size: file.size
    }
    const saveResponse = await apiClient.post("/files", fileToSave);
    if (saveResponse.status !== 200) {
      toast.error(`Falha ao tentar enviar arquivo: ${file.name}`);
      continue;
    }

    toast.success(`Arquivo enviado com sucesso: ${file.name}`);
  }
}
