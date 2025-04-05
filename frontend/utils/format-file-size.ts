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

export default function formatFileSize(size: number, locale?: string): string {
  if (!locale) locale = getLocale();

  let multiplierIndex = 0;
  while (size >= 100 && multiplierIndex < multipliers.length - 1) {
    size /= 1024;
    multiplierIndex += 1;
  }
  const sizeStr = size.toLocaleString(locale, localeStringOptions);
  return `${sizeStr} ${multipliers[multiplierIndex]}B`;
}
