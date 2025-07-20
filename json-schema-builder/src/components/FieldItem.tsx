import { useState } from "react";

export type FieldType = "String" | "Number" | "Nested";

export interface Field {
  key: string;
  type: FieldType;
  children?: Field[];
}

interface Props {
  field: Field;
  fields: Field[];
  index: number;
  onChange: (fields: Field[]) => void;
  parentUpdate: (fields: Field[]) => void;
}

export function FieldItem({ field, index, fields, onChange, parentUpdate }: Props) {
  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = [...fields];
    updated[index].key = e.target.value;
    onChange(updated);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updated = [...fields];
    updated[index].type = e.target.value as FieldType;
    if (e.target.value === "Nested" && !updated[index].children) {
      updated[index].children = [];
    }
    onChange(updated);
  };

  const handleDelete = () => {
    const updated = fields.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleNestedChange = (newChildren: Field[]) => {
    const updated = [...fields];
    updated[index].children = newChildren;
    onChange(updated);
  };

  return (
    <div className="space-y-1 border rounded p-2 mb-2">
      <div className="flex gap-2 items-center">
        <input
          placeholder="Field key"
          value={field.key}
          onChange={handleKeyChange}
          className="border p-1 rounded w-1/3"
        />
        <select
          value={field.type}
          onChange={handleTypeChange}
          className="border p-1 rounded"
        >
          <option value="String">String</option>
          <option value="Number">Number</option>
          <option value="Nested">Nested</option>
        </select>
        <button onClick={handleDelete} className="text-red-500 font-semibold">
          ✕
        </button>
      </div>

      {field.type === "Nested" && (
        <div className="ml-4">
          {(field.children || []).map((child, idx) => (
            <FieldItem
              key={idx}
              field={child}
              index={idx}
              fields={field.children!}
              onChange={handleNestedChange}
              parentUpdate={handleNestedChange}
            />
          ))}
          <button
            onClick={() =>
              handleNestedChange([...(field.children || []), { key: "", type: "String" }])
            }
            className="bg-green-500 text-white px-2 py-1 rounded mt-2"
          >
            + Add Nested Field
          </button>
        </div>
      )}
    </div>
  );
}
