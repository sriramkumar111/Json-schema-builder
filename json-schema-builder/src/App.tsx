import { SchemaBuilder } from "./components/SchemaBuilder";

function App() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">JSON Schema Builder</h1>
      <SchemaBuilder />
    </div>
  );
}

export default App;
