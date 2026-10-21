import { useEffect, useState } from "react";

export function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    console.log("start interval");
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => {
      console.log("clear interval");
      clearInterval(id);
    };
  }, []);

  return <p className="big">{now.toLocaleTimeString()}</p>;
}