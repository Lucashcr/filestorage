const multipliers = ["", "k", "M", "G"];

const localeStringOptions = {
  maximumFractionDigits: 2,
};

export default function formatFileSize(size: number, locale: string): string {
  let multiplierIndex = 0;
  while (size >= 100 && multiplierIndex < multipliers.length - 1) {
    size /= 1000;
    multiplierIndex += 1;
  }
  const sizeStr = size.toLocaleString(locale, localeStringOptions);
  return `${sizeStr} ${multipliers[multiplierIndex]}B`;
}
