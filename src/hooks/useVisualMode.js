import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (target, replace = false) => {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), target]);
    } else {
      setHistory((prev) => [...prev, target]);
    }
    setMode(target);
  };
  const back = () => {
    if (history.length === 1) return;
    setMode(history[history.length - 2]);
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };
  return { mode, history, transition, back };
}
