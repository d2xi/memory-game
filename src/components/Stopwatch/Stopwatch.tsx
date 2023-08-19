import { useState, useRef } from "react";
import "./Stopwatch.css";
export interface StopwatchControls {
  start: () => void;
  stop: () => void;
}
export interface StopwatchComponentProps {
  onInit: (sc: StopwatchControls) => void;
}

export default function StopwatchComponent({
  onInit,
}: StopwatchComponentProps) {
  const initDoneRef = useRef(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [currTime, setCurrTime] = useState<number>(0);
  const intervalRef = useRef<number | undefined>();
  if (!initDoneRef.current) {
    initDoneRef.current = true;
    const start = () => {
      setStartTime(Date.now());
      intervalRef.current = setInterval(() => setCurrTime(Date.now()), 10);
    };
    const stop = () => {
      clearInterval(intervalRef.current);
      initDoneRef.current = false;
    };
    setStartTime(0);
    setCurrTime(0);
    intervalRef.current = undefined;
    onInit({ start, stop });
  }
  return (
    <>
      <div className="stopwatch">
        {(initDoneRef.current &&
          currTime > 0 &&
          ((currTime - startTime) / 1000).toFixed(3)) ||
          Number(0).toFixed(3)}
      </div>
    </>
  );
}
