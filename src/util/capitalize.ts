export const capitalize = (string: string) => {
  if (!string) {
    return string;
  }
  let first = string[0].toUpperCase();
  let rest = string.slice(1);

  return first + rest;
};
