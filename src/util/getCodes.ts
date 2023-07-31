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
  ): BooleanObject | null => {
    for (let i = 0; i < array.length; i++) {
      console.log("1", array[i].code, code);
      if (array[i].code === code) {
        console.log(result[array[i - 1].code]);
      }
      if (Array.isArray(array[i].items)) {
        let found = findCode(array[i] as Array<ItemsType>, code);

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
      let parent = findCode(firstArray, code);

      if (parent) {
        result[parent.code] = true;
      }
    }
  }

  return result;
};
