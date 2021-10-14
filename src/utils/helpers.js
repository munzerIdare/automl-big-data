import { pull, sample } from "lodash";
export const getRandomColumn = (columns, itemToRemove) => {
  if (columns && columns.length > 0 && itemToRemove) {
    const filtered = pull(columns, itemToRemove);
    const random = sample(filtered);
    return random;
  } else {
    return null;
  }
};
