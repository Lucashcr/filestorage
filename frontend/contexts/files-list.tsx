import FileType from "@/types/file";
import { UUID } from "crypto";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type ContextType = {
  files: FileType[];
  setFiles: Dispatch<SetStateAction<FileType[]>>;
  addFile: (file: FileType) => void;
  removeFile: (id: UUID) => void;
};

const FilesListContext = createContext<ContextType>({} as ContextType);

export const useFilesListContext = () => useContext(FilesListContext);

export const FilesListProvider = ({ children }: React.PropsWithChildren) => {
  const [files, setFiles] = useState<FileType[]>([]);

  const addFile = (newFile: FileType) => {
    setFiles((prev) => [...prev, newFile]);
  };

  const removeFile = (id: UUID) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  return (
    <FilesListContext.Provider value={{ files, setFiles, addFile, removeFile }}>
      {children}
    </FilesListContext.Provider>
  );
};
