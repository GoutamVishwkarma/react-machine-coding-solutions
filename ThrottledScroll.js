import { useEffect, useRef } from "react";

const useThrottle = (cb, delay) => {
  const shouldWait = useRef(false);

  return (...args) => {
    if (shouldWait.current) return;

    cb(...args);
    shouldWait.current = true;

    setTimeout(() => {
      shouldWait.current = false;
    }, delay);
  };
};

export default function App() {

  const handleCallApi = () => {
    console.log("API Getting Called!");
  };

  const throttledApi = useThrottle(handleCallApi, 1000);

  useEffect(() => {
    const listener = () => throttledApi();
    window.addEventListener("scroll", listener);

    return () => window.removeEventListener("scroll", listener);
  }, []);

  return (
    <div className="App">
      <h3 id="heading">Interview</h3>
    </div>
  );
}


//give 10000 px plus height in App class
