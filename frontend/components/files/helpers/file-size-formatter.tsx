import { useEffect, useState } from "react";
import formatFileSize from "./format-file-size";

const getLocale = () => {
  if (typeof window !== "undefined") {
    return navigator.language || "en-US";
  } else {
    return "en-US";
  }
};

type FileSizeFormatterProps = {
  size: number;
  className: string;
};

export default function FileSizeFormatter({
  size,
  className,
}: FileSizeFormatterProps) {
  const [locale, setLocale] = useState("en-US");

  useEffect(() => {
    setLocale(getLocale());
  }, []);

  return (
    <p className={className}>{formatFileSize(size, locale)}</p>
  );
}
