import React, { useState } from "react";
import "./styles.css";

const items = [
  {
    id: "acc-1",
    title: "JavaScript Basics",
    content: "Learn variables, functions, and loops in JavaScript.",
  },
  {
    id: "acc-2",
    title: "React.js Overview",
    content: "Understand components, state, and props in React.",
  },
  {
    id: "acc-3",
    title: "Node.js",
    content: "Basics of server-side development with Node.js.",
  },
  {
    id: "acc-4",
    title: "Full-Stack Development",
    content: "Build full-stack apps with React and Node.js.",
  },
];

function Accordian({ item, isOpen, handleAccordian }) {
  const open = isOpen[item.id];

  return (
    <div
      style={{
        margin: "4px 0",
        borderRadius: "6px",
        border: "1px solid #ccc",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => handleAccordian(item.id)}
        onKeyDown={(e) => e.key === "Enter" && handleAccordian(item.id)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 12px",
          background: "#f9f9f9",
          cursor: "pointer",
          fontWeight: "500",
        }}
      >
        <span>{item.title}</span>
        <span
          style={{
            display: "inline-block",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          ⬇️
        </span>
      </div>

      {/* Content */}
      {open && (
        <div
          style={{ padding: "8px 12px", background: "#fff", fontSize: "14px" }}
        >
          {item.content}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [accordianOpen, setAccordianOpen] = useState({});

  // Allow multiple accordions to stay open
  const handleAccordian = (id) => {
    setAccordianOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className="App"
      style={{ width: "320px", margin: "20px auto", fontFamily: "sans-serif" }}
    >
      <h3 style={{ textAlign: "center" }}>React Accordion</h3>
      {items.map((accordian) => (
        <Accordian
          key={accordian.id}
          item={accordian}
          isOpen={accordianOpen}
          handleAccordian={handleAccordian}
        />
      ))}
    </div>
  );
}


//avoid adding inline styles
