import { useState, useEffect } from "react";
import { Input } from "./components/Input";
import { Card, CardContent } from "./components/Card";
import { Label } from "./components/Label";
import "./styles.css";

export default function TimeTracker() {
  const [totalTimeInput, setTotalTimeInput] = useState(""); // Raw input for total time
  const [totalTime, setTotalTime] = useState(0);
  const [times, setTimes] = useState(["", "", ""]);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    setRemainingTime(totalTime);
  }, [totalTime]);

  const handleInputChange = (index, value) => {
    value = value.replace(/\D/g, "");
    let newTimes = [...times];
    newTimes[index] = value ? formatTimeInput(value) : "";
    setTimes(newTimes);
    calculateRemainingTime(newTimes);
  };

  const handleTotalTimeChange = (value) => {
    value = value.replace(/\D/g, "");
    setTotalTimeInput(value ? formatTimeInput(value) : "");
    setTotalTime(value ? parseTime(formatTimeInput(value)) : 0);
    setRemainingTime(value ? parseTime(formatTimeInput(value)) : 0);
  };

  const formatTimeInput = (value) => {
    let ms = value.slice(-2) || "00";
    let sec = value.slice(-4, -2) || "00";
    let min = value.slice(0, -4) || "0";
    return `${parseInt(min)}:${sec.padStart(2, "0")}.${ms.padStart(2, "0")}`;
  };

  const parseTime = (timeString) => {
    if (!timeString) return 0;
    let [min, sec] = timeString.split(":");
    let [seconds, ms] = sec.split(".");
    return (parseInt(min) * 60 * 1000) + (parseInt(seconds) * 1000) + parseInt(ms);
  };

  const calculateRemainingTime = (newTimes) => {
    let usedTime = newTimes.reduce((acc, time) => acc + parseTime(time), 0);
    setRemainingTime(totalTime - usedTime);
  };

  const formatRemainingTime = (ms) => {
    let isNegative = ms < 0;
    let absMs = Math.abs(ms);
    let minutes = Math.floor(absMs / 60000);
    let seconds = Math.floor((absMs % 60000) / 1000);
    let milliseconds = Math.floor((absMs % 1000) / 10);
    let formattedTime = `${minutes}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(2, "0")}`;
    return isNegative ? `-${formattedTime}` : formattedTime;
  };

  return (
    <div className="container">
      <div className="tracker-box">
        <Label>Total Time:</Label>
        <Input
          type="text"
          value={totalTimeInput}
          onChange={(e) => handleTotalTimeChange(e.target.value)}
          placeholder="0:00.00"
          inputMode="numeric"
          className="total-time-input"
        />
        
        <Card className="card">
          {times.map((time, index) => (
            <div key={index} className="input-group">
              <Label>Solve {index + 1}:</Label>
              <Input
                type="text"
                value={time}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder="0:00.00"
                inputMode="numeric"
              />
            </div>
          ))}
          <CardContent>
            <p className="remaining-time">Remaining Time: {formatRemainingTime(remainingTime)}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
