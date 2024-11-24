"use client";

import { useEffect, useState } from "react";

const multipliers = ["", "k", "M", "G"];

const localeStringOptions = {
  maximumFractionDigits: 2,
};

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

  let multiplierIndex = 0;
  while (size >= 100 && multiplierIndex < multipliers.length - 1) {
    size /= 1000;
    multiplierIndex += 1;
  }
  const sizeStr = size.toLocaleString(locale, localeStringOptions);
  return (
    <p className={className}>{`${sizeStr} ${multipliers[multiplierIndex]}B`}</p>
  );
}
