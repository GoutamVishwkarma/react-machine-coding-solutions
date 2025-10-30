import React, { useState } from "react";
import "./styles.css";

// structured tab data
const tabList = [
  {
    id: "tab-1",
    label: "Overview",
    content: "Welcome to the Overview tab!",
  },
  {
    id: "tab-2",
    label: "Details",
    content: "Here are some detailed insights.",
  },
  {
    id: "tab-3",
    label: "Settings",
    content: "",
  },
];

// ✅ Separate component for tab content
function TabContent({ activeTab }) {
  if (!activeTab?.content) {
    return <div style={{ padding: "1rem", color: "#666" }}>No Content Available</div>;
  }
  return <div style={{ padding: "1rem" }}>{activeTab.content}</div>;
}

export default function Tabs() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  const activeTab = tabList[activeIndex];

  // Edge case: handle empty tab list
  if (!tabList || tabList.length === 0) {
    return <div style={{ textAlign: "center", padding: "1rem" }}>No tabs available</div>;
  }

  return (
    <div style={{ width: "400px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Tabs Component</h2>

      {/* Tab headers */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          borderBottom: "2px solid #ddd",
        }}
      >
        {tabList.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(index)}
            style={{
              flex: 1,
              padding: "0.5rem 1rem",
              border: "none",
              borderBottom:
                activeIndex === index ? "3px solid #007bff" : "3px solid transparent",
              backgroundColor: "transparent",
              fontWeight: activeIndex === index ? "600" : "400",
              cursor: "pointer",
            }}
          >
            {tab.label || `Tab ${index + 1}`}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <TabContent activeTab={activeTab} />
    </div>
  );
}

// avoid inline styling or use less
