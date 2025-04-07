import { UUID } from "crypto";

type FileType = {
  id: UUID;
  type: string;
  title: string;
  path: string;
  size: number;
};

export default FileType;