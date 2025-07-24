export const faToEnDigits = (str: string): string => {
  return str.replace(/[\u06F0-\u06F9]/g, (char) =>
    String.fromCharCode(char.charCodeAt(0) - 1728)
  );
};

export const enToFaDigits = (str: string) =>
  str.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
