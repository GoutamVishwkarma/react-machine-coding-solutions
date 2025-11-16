import { useState } from "react";
import "./styles.css";

export default function App() {
  const [fields, setFields] = useState([]);

  const addField = () => {
    const key = Date.now().toString() + "-field";
    setFields((prev) => [...prev, { id: key, value: "" }]);
  };

  const handleFieldVal = (e, id) => {
    const { value } = e.target;
    setFields((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const removeField = (id) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="App">
      <button onClick={addField}>Add field</button>
      <h1>Hello CodeSandbox</h1>

      {fields.map((item) => (
        <div key={item.id} style={{ marginBottom: "8px" }}>
          <input
            type="text"
            value={item.value}
            onChange={(e) => handleFieldVal(e, item.id)}
            placeholder="Enter value"
          />
          <button onClick={() => removeField(item.id)}>Remove</button>
        </div>
      ))}

      <h2>Start editing to see some magic happen!</h2>
      <pre>{JSON.stringify(fields, null, 2)}</pre>
    </div>
  );
}
