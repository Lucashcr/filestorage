import formatFileSize from "@/utils/format-file-size";

describe("File size formatter", () => {
  const locales = ["pt-BR", "en-US"];

  test.each(locales)("Should format files in bytes [units]", (locale: string) => {
    const size = 1.23456789;
    
    const result = formatFileSize(size, locale);
    
    const localedValue = 1.23.toLocaleString(locale);
    expect(result).toBe(`${localedValue} B`);
  });

  test.each(locales)("Should format files in bytes [tens]", (locale: string) => {
    const size = 12.3456789;
    
    const result = formatFileSize(size, locale);
    
    const localedValue = 12.35.toLocaleString(locale);
    expect(result).toBe(`${localedValue} B`);
  });

  test.each(locales)("Should format files in kilobytes [decimals]", (locale: string) => {
    const size = 123.456789;
    
    const result = formatFileSize(size, locale);
    
    const localedValue = 0.12.toLocaleString(locale);
    expect(result).toBe(`${localedValue} kB`);
  });

  test.each(locales)("Should format files in kilobytes [units]", (locale: string) => {
    const size = 1234.56789;
    
    const result = formatFileSize(size, locale);
    
    const localedValue = 1.21.toLocaleString(locale);
    expect(result).toBe(`${localedValue} kB`);
  });

  test.each(locales)("Should format files in kilobytes [tens]", (locale: string) => {
    const size = 12345.6789;
    
    const result = formatFileSize(size, locale);
    
    const localedValue = 12.06.toLocaleString(locale);
    expect(result).toBe(`${localedValue} kB`);
  });

  test.each(locales)("Should format files in megabytes [decimals]", (locale: string) => {
    const size = 123456.789;
    
    const result = formatFileSize(size, locale);
    
    const localedValue = 0.12.toLocaleString(locale);
    expect(result).toBe(`${localedValue} MB`);
  });

  test.each(locales)("Should format files in megabytes [units]", (locale: string) => {
    const size = 1234567.89;
    
    const result = formatFileSize(size, locale);
    
    const localedValue = 1.18.toLocaleString(locale);
    expect(result).toBe(`${localedValue} MB`);
  });

  test.each(locales)("Should format files in megabytes [tens]", (locale: string) => {
    const size = 12345678.9;
    
    const result = formatFileSize(size, locale);
    
    const localedValue = 11.77.toLocaleString(locale);
    expect(result).toBe(`${localedValue} MB`);
  });

  test.each(locales)("Should format files in gigabytes [decimals]", (locale: string) => {
    const size = 123456789;
    
    const result = formatFileSize(size, locale);
    
    const localedValue = 0.11.toLocaleString(locale);
    expect(result).toBe(`${localedValue} GB`);
  });

  test.each(locales)("Should format files in gigabytes [units]", (locale: string) => {
    const size = 1234567890;
    
    const result = formatFileSize(size, locale);
    
    const localedValue = 1.15.toLocaleString(locale);
    expect(result).toBe(`${localedValue} GB`);
  });

  test.each(locales)("Should format files in gigabytes [tens]", (locale: string) => {
    const size = 12345678900;
    
    const result = formatFileSize(size, locale);
    
    const localedValue = 11.5.toLocaleString(locale);
    expect(result).toBe(`${localedValue} GB`);
  });

  test.each(locales)("Should format files in gigabytes [hundreds]", (locale: string) => {
    const size = 123456789000;
    
    const result = formatFileSize(size, locale);
    
    const localedValue = 114.98.toLocaleString(locale);
    expect(result).toBe(`${localedValue} GB`);
  });

  test.each(locales)("Should format files in gigabytes [thousands]", (locale: string) => {
    const size = 1234567890000;
    
    const result = formatFileSize(size, locale);
    
    const localedValue = 1149.78.toLocaleString(locale);
    expect(result).toBe(`${localedValue} GB`);
  });
});
