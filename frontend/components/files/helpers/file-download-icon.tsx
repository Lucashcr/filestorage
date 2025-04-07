import { MdDownload } from "react-icons/md";

import apiClient from "@/services/api";
import { toast } from "react-toastify";
import FileType from "@/types/file";
import axios from "axios";

type FileDownloadIconProps = {
  file: FileType;
};

type BucketDownloadResponse = {
  data: { url: string };
};

export default function FileDownloadIcon({ file }: FileDownloadIconProps) {
  async function onClickHandler() {
    const response: BucketDownloadResponse = await apiClient.get(`/bucket/download/${file.id}`);

    if (!response.data) {
      toast.error(`Não foi possível fazer o download do arquivo: ${file.title}`);
      return;
    }

    const responseFile = await axios.get(response.data.url, {
      responseType: "blob",
    });

    if (!responseFile.data) {
      toast.error(`Não foi possível fazer o download do arquivo: ${file.title}`);
      return;
    }

    const url = window.URL.createObjectURL(new Blob([responseFile.data]));
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", file.title);
    link.click();

    toast.success(`Download do arquivo: ${file.title} concluído com sucesso`);
  }
  return (
    <div className="p-2 rounded-full hover:cursor-pointer hover:bg-accent transition duration-[300ms]">
      <MdDownload size={25} onClick={onClickHandler} />
    </div>
  );
}
