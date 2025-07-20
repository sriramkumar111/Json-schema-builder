import { useState } from "react";
import { FieldItem, FieldType, Field } from "./FieldItem";
import { generateSchema } from "../utils/generateSchema";

export function SchemaBuilder() {
  const [fields, setFields] = useState<Field[]>([]);

  const handleChange = (updatedFields: Field[]) => {
    setFields(updatedFields);
  };

  return (
    <div className="flex gap-6">
      <div className="w-1/2 space-y-2">
        {fields.map((field, index) => (
          <FieldItem
            key={index}
            index={index}
            field={field}
            onChange={handleChange}
            fields={fields}
            parentUpdate={setFields}
          />
        ))}
        <button
          onClick={() =>
            setFields([...fields, { key: "", type: "String" }])
          }
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          + Add Field
        </button>
      </div>

      <div className="w-1/2 bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Generated JSON Schema:</h2>
        <pre className="bg-gray-100 p-2 rounded text-sm">
          {JSON.stringify(generateSchema(fields), null, 2)}
        </pre>
      </div>
    </div>
  );
}
