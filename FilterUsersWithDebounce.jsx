import { useState, useEffect, useMemo } from "react";

const userList = [
  {
    name: "Goutam Vishwakarma",
    age: 24,
    email: "goutam.vishwakarma@gmail.com",
    address: "221B Baker Street, London",
  },
  {
    name: "Ananya Singh",
    age: 26,
    email: "ananya.singh@gmail.com",
    address: "14 MG Road, Bengaluru",
  },
  {
    name: "Ravi Patel",
    age: 28,
    email: "ravi.patel@gmail.com",
    address: "102 Nehru Nagar, Ahmedabad",
  },
  {
    name: "Priya Sharma",
    age: 25,
    email: "priya.sharma@gmail.com",
    address: "9 Lodhi Colony, New Delhi",
  },
  {
    name: "Karan Mehta",
    age: 27,
    email: "karan.mehta@gmail.com",
    address: "88 Marine Drive, Mumbai",
  },
  {
    name: "Sneha Rao",
    age: 23,
    email: "sneha.rao@gmail.com",
    address: "55 Jubilee Hills, Hyderabad",
  },
  {
    name: "Arjun Das",
    age: 29,
    email: "arjun.das@gmail.com",
    address: "12 Salt Lake, Kolkata",
  },
  {
    name: "Neha Kapoor",
    age: 24,
    email: "neha.kapoor@gmail.com",
    address: "5 Sector 18, Noida",
  },
  {
    name: "Vivek Yadav",
    age: 30,
    email: "vivek.yadav@gmail.com",
    address: "44 Park Street, Pune",
  },
  {
    name: "Tanya Verma",
    age: 22,
    email: "tanya.verma@gmail.com",
    address: "17 Civil Lines, Jaipur",
  },
];

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  // exported as array in case we add more values in future
  return [debounced];
};

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [delayedValue] = useDebounce(inputValue, 500);
  const [error, setError] = useState("");

  // Filter logic with error + loading simulation
  const filteredList = useMemo(() => {
    try {
      if (!delayedValue.trim()) return userList;

      const result = userList.filter((u) =>
        Object.values(u).some((val) =>
          String(val).toLowerCase().includes(delayedValue.toLowerCase())
        )
      );
      if (result.length === 0) throw new Error("No matching users found");
      return result;
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, [delayedValue]);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h3>Interview Task</h3>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setError("");
          setInputValue(e.target.value);
        }}
        placeholder="Search..."
        style={{ padding: 6, width: 240, marginBottom: 10 }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredList.map((u) => (
          <li key={u.email} style={{ margin: "4px 0" }}>
            <span>{u.name} — </span>
            <span>{u.age} — </span>
            <span>{u.email} — </span>
            <span>{u.address}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


