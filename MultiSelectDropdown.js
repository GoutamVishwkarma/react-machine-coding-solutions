import { useState } from "react";
import "./styles.css";

const option = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "mango", label: "Mango" },
  { value: "grapes", label: "Grapes" },
  { value: "strawberry", label: "Strawberry" },
];

export default function App() {
  const [options, setOptions] = useState([]); // selected
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (item) => {
    // Prevent duplicate
    if (!options.some((o) => o.value === item.value)) {
      setOptions((prev) => [...prev, item]);
    }
    setSearchTerm("");
  };

  const deleteOption = (id) => {
    let filteredOptions = options.filter((o) => o.value !== id);
    setOptions(filteredOptions);
  };

  const filtered = option.filter(
    (o) =>
      o.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !options.some((s) => s.value === o.value)
  );

  return (
    <div className="App">
      <h1>Searchable Multi-Select</h1>

      <div className="dropdown">
        <div
          className="dropdown-input"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <div className="selected-tags">
            {options.map((o) => (
              <span key={o.value} className="tag">
                {o.label}
                <button
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteOption(o.value);
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen(!dropdownOpen);
            }}
          />
        </div>

        {dropdownOpen && (
          <div className="dropdown-menu">
            {filtered.length ? (
              filtered.map((o) => (
                <div
                  key={o.value}
                  className="dropdown-item"
                  onClick={() => handleSelect(o)}
                >
                  {o.label}
                </div>
              ))
            ) : (
              <div className="no-option">No options found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
