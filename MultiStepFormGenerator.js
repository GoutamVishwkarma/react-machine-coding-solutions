import React, { useState } from "react";
import "./styles.css";

const formSchema = [
  {
    section: "Basic Information",
    fields: [
      {
        id: "3213ee",
        name: "firstName",
        label: "First Name",
        type: "text",
        required: true,
      },
      {
        id: "3121ff",
        name: "lastName",
        label: "Last Name",
        type: "text",
        required: true,
      },
      { id: "4343vv", name: "age", label: "Age", type: "number" },
      {
        id: "selectGender",
        name: "gender",
        label: "Gender",
        type: "select",
        options: ["Male", "Female", "Other"],
        required: true,
      },
    ],
  },
  {
    section: "Account Settings",
    fields: [
      {
        id: "435543",
        name: "email",
        label: "Email",
        type: "email",
        required: true,
      },
      { id: "bio343", name: "bio", label: "Bio", type: "textarea" },
      {
        id: "324543",
        name: "receiveNewsletter",
        label: "Subscribe to Newsletter",
        type: "checkbox",
      },
    ],
  },
];

function FormConstructor({ section, formData, setFormData, error }) {
  const handleInputValue = (e, id, type) => {
    const val = type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [id]: val }));
  };

  return (
    <div
      style={{
        marginBottom: 20,
        padding: 10,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h3 style={{ marginBottom: 10 }}>{section.section}</h3>
      {section.fields.map((field) => {
        const val =
          field.type === "checkbox"
            ? formData[field.id] || false
            : formData[field.id] || "";
        const hasError = error[field.id];

        switch (field.type) {
          case "checkbox":
            return (
              <div key={field.id} style={{ marginBottom: 10 }}>
                <label style={{ marginRight: 8 }}>{field.label}</label>
                <input
                  type="checkbox"
                  checked={val}
                  onChange={(e) => handleInputValue(e, field.id, field.type)}
                />
              </div>
            );

          case "select":
            return (
              <div key={field.id} style={{ marginBottom: 10 }}>
                <label style={{ display: "block", marginBottom: 4 }}>
                  {field.label}{" "}
                  {field.required && <span style={{ color: "red" }}>*</span>}
                </label>
                <select
                  value={val}
                  onChange={(e) => handleInputValue(e, field.id, field.type)}
                  style={{ padding: 5, width: "100%", borderRadius: 4 }}
                >
                  <option value="">Select</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {hasError && (
                  <div style={{ color: "red" }}>This field is required!</div>
                )}
              </div>
            );

          case "textarea":
            return (
              <div key={field.id} style={{ marginBottom: 10 }}>
                <label style={{ display: "block", marginBottom: 4 }}>
                  {field.label}
                </label>
                <textarea
                  value={val}
                  onChange={(e) => handleInputValue(e, field.id, field.type)}
                  style={{
                    width: "100%",
                    minHeight: 60,
                    padding: 5,
                    borderRadius: 4,
                  }}
                />
              </div>
            );

          default:
            return (
              <div key={field.id} style={{ marginBottom: 10 }}>
                <label style={{ display: "block", marginBottom: 4 }}>
                  {field.label}{" "}
                  {field.required && <span style={{ color: "red" }}>*</span>}
                </label>
                <input
                  type={field.type}
                  value={val}
                  onChange={(e) => handleInputValue(e, field.id, field.type)}
                  style={{ width: "100%", padding: 5, borderRadius: 4 }}
                />
                {hasError && (
                  <div style={{ color: "red" }}>This field is required!</div>
                )}
              </div>
            );
        }
      })}
    </div>
  );
}

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const formSection = formSchema[currentSection];

  const validateForm = () => {
    let valid = true;
    const errors = {};
    formSection.fields.forEach((f) => {
      if (f.required && !formData[f.id]) {
        errors[f.id] = true;
        valid = false;
      }
    });
    setErrors(errors);
    return valid;
  };

  const handleFormNavigation = (dir) => {
    if (validateForm()) {
      setCurrentSection((prev) => (dir === "next" ? prev + 1 : prev - 1));
    }
  };

  return (
    <div
      className="App"
      style={{
        maxWidth: 400,
        margin: "30px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        Dynamic Form Builder
      </h1>

      <FormConstructor
        section={formSection}
        formData={formData}
        setFormData={setFormData}
        error={errors}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {currentSection > 0 && (
          <button
            onClick={() => handleFormNavigation("prev")}
            style={{ padding: "6px 12px", borderRadius: 5, cursor: "pointer" }}
          >
            Prev
          </button>
        )}
        {currentSection < formSchema.length - 1 && (
          <button
            onClick={() => handleFormNavigation("next")}
            style={{
              padding: "6px 12px",
              borderRadius: 5,
              cursor: "pointer",
              marginLeft: "auto",
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
