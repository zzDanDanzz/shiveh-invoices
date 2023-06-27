import { digitsEnToFa } from "@persian-tools/persian-tools";

export const digitNormalizer = (s: string | number) =>
  digitsEnToFa(s).split("").reverse().join("");

export const dateNormalizer = (d: string) => digitNormalizer(
  d.split(" ")[0].replaceAll("-", "/")
);
