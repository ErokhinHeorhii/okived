export const lowerCase = (string: string) => {
  if (!string) {
    return string;
  }
  let first = string[0].toLowerCase();
  let rest = string.slice(1);

  return first + rest;
};
