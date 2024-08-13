const stringToTime = (time: string) => {
  let [hour, minute] = time.split(":");
  const date = new Date();
  date.setHours(parseInt(hour, 10));
  date.setMinutes(parseInt(minute, 10));
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

const addTime = (time1: string, time2: string) => {
  const [hour1, minute1] = time1.split(":");
  const [hour2, minute2] = time2.split(":");
  const totalMinutes1 = Number(hour1) * 60 + Number(minute1);
  const totalMinutes2 = Number(hour2) * 60 + Number(minute2);
  const totalMinutes = totalMinutes1 + totalMinutes2;
  const finalHours = Math.floor(totalMinutes / 60);
  const finalMinutes = totalMinutes % 60;
  const formattedTime = `${String(finalHours).padStart(2, "0")}:${String(finalMinutes).padStart(2, "0")}`;
  return formattedTime;
};

export { stringToTime, addTime };
