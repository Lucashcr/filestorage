import fileSizeformatter from "@/components/files/helpers/file-size-formatter";

describe("File size formatter", () => {
  beforeAll(() => {
    global.navigator = {
      ...global.navigator,
      language: "pt-BR"
    };
  });

  test("Should format files in bytes [units]", () => {
    const size = 1.23456789;
    
    const result = fileSizeformatter(size);
    
    const localedValue = 1.23.toLocaleString();
    expect(result).toBe(`${localedValue} B`);
  });

  test("Should format files in bytes [tens]", () => {
    const size = 12.3456789;
    
    const result = fileSizeformatter(size);
    
    const localedValue = 12.35.toLocaleString();
    expect(result).toBe(`${localedValue} B`);
  });

  test("Should format files in kilobytes [decimals]", () => {
    const size = 123.456789;
    
    const result = fileSizeformatter(size);
    
    const localedValue = 0.12.toLocaleString();
    expect(result).toBe(`${localedValue} kB`);
  });

  test("Should format files in kilobytes [units]", () => {
    const size = 1234.56789;
    
    const result = fileSizeformatter(size);
    
    const localedValue = 1.23.toLocaleString();
    expect(result).toBe(`${localedValue} kB`);
  });

  test("Should format files in kilobytes [tens]", () => {
    const size = 12345.6789;
    
    const result = fileSizeformatter(size);
    
    const localedValue = 12.35.toLocaleString();
    expect(result).toBe(`${localedValue} kB`);
  });

  test("Should format files in megabytes [decimals]", () => {
    const size = 123456.789;
    
    const result = fileSizeformatter(size);
    
    const localedValue = 0.12.toLocaleString();
    expect(result).toBe(`${localedValue} MB`);
  });

  test("Should format files in megabytes [units]", () => {
    const size = 1234567.89;
    
    const result = fileSizeformatter(size);
    
    const localedValue = 1.23.toLocaleString();
    expect(result).toBe(`${localedValue} MB`);
  });

  test("Should format files in megabytes [tens]", () => {
    const size = 12345678.9;
    
    const result = fileSizeformatter(size);
    
    const localedValue = 12.35.toLocaleString();
    expect(result).toBe(`${localedValue} MB`);
  });

  test("Should format files in gigabytes [decimals]", () => {
    const size = 123456789;
    
    const result = fileSizeformatter(size);
    
    const localedValue = 0.12.toLocaleString();
    expect(result).toBe(`${localedValue} GB`);
  });

  test("Should format files in gigabytes [units]", () => {
    const size = 1234567890;
    
    const result = fileSizeformatter(size);
    
    const localedValue = 1.23.toLocaleString();
    expect(result).toBe(`${localedValue} GB`);
  });

  test("Should format files in gigabytes [tens]", () => {
    const size = 12345678900;
    
    const result = fileSizeformatter(size);
    
    const localedValue = 12.35.toLocaleString();
    expect(result).toBe(`${localedValue} GB`);
  });

  test("Should format files in gigabytes [hundreds]", () => {
    const size = 123456789000;
    
    const result = fileSizeformatter(size);
    
    const localedValue = 123.46.toLocaleString();
    expect(result).toBe(`${localedValue} GB`);
  });

  test("Should format files in gigabytes [thousands]", () => {
    const size = 1234567890000;
    
    const result = fileSizeformatter(size);
    
    const localedValue = 1234.57.toLocaleString();
    expect(result).toBe(`${localedValue} GB`);
  });
});
