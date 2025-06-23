import path from "path";
import DataUriParser from "datauri/parser.js";


const parser = new DataUriParser();

export const getDataUri = (file) => {
  const extName = path.extname(file.originalname).toString(); // e.g. '.pdf'
  return parser.format(extName, file.buffer); // returns { content, mimetype }
};
