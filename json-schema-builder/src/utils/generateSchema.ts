import { Field } from "../components/FieldItem";

export const generateSchema = (fields: Field[]): any => {
  const result: any = {};
  for (const field of fields) {
    if (!field.key) continue;
    if (field.type === "Nested") {
      result[field.key] = generateSchema(field.children || []);
    } else {
      result[field.key] = field.type.toLowerCase();
    }
  }
  return result;
};
