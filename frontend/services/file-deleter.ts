import apiClient from "@/services/api";
import FileType from "@/types/file";
import axios from "axios";
import { UUID } from "crypto";
import { toast } from "react-toastify";

export default async function handleDeleteFile(file: FileType, removeFile: (uuid: UUID) => void) {
  const data = { filename: file.title };
  const response = await apiClient.post("/bucket/generate-delete-url", data);

  if (response.status !== 200 || !response.data?.url) {
    toast.error(`Falha ao tentar excuir arquivo: ${file.title}`);
    return;
  }

  const deleteResponseBackend = await apiClient.delete(`/files/${file.id}`);
  if (deleteResponseBackend.status !== 204) {
    toast.error(`Falha ao tentar excuir arquivo: ${file.title}`);
    return;
  }

  const deleteResponseBucket = await axios.delete(response.data.url);

  if (deleteResponseBucket.status !== 204) {
    toast.error(`Falha ao tentar excuir arquivo: ${file.title}`);
    return;
  }

  removeFile(file.id);
  toast.success(`Arquivo excluído com sucesso: ${file.title}`);
}
