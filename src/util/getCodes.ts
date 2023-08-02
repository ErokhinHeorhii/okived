import { ItemsType } from "../components/ListOkived/Item.tsx";
import { BooleanObject } from "../components/ListOkived/ListOkived.tsx";

export const getCodes = (
  firstArray: Array<ItemsType>,
  secondArray: Array<ItemsType>,
): BooleanObject => {
  let result = {};

  const findCode = (
    array: Array<ItemsType>,
    code: string | number,
    parentCode: string | number | null,
  ): ItemsType | null => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].code === code) {
        if (parentCode as string) {
          result[parentCode] = true;
        }

        return array[i];
      }
      if (Array.isArray(array[i].items)) {
        let found = findCode(array[i].items, code, array[i].code);

        if (found) {
          return found;
        }
      }
    }

    return null;
  };

  for (let item of secondArray) {
    let code = item.code;

    if (/^\d/.test(code)) {
      let parent = findCode(firstArray, code, null);

      if (parent) {
        result[parent.code] = true;
      }
    }
  }

  return result;
};
