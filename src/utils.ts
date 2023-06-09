import { digitsEnToFa } from "@persian-tools/persian-tools";

export const digitNormalizer = (s: string | number) =>
  digitsEnToFa(s).split("").reverse().join("");