import XRegExp from "xregexp";

const patterns = {
  title: ["^[0-9\\p{L} _.&@<>!_\\](){}\\[,\\/\\-.;#=$%:~'\"?+]+$"],
  description: ["^[0-9\\p{L} _.&@<>!_\\](){}\\[,\\/\\-.;#=$%\n:~'\"?+]+$"],
};
export const validateRegex = (key, value) => {
  const reg = new XRegExp(patterns[key]);
  return reg.test(value);
};

export const newAssetValidation = (values) => {
  const errors = {};

  const title = validateRegex("title", values.title);
  const description = validateRegex("description", values.description);

  if (!title) errors.title = "Invalid title";
  if (!description) errors.description = "Invalid description";
  console.log(values, errors);
  return errors;
};
