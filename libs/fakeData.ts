const directionsData = {
  distance: {
    text: "5.0 公里",
    value: 4802,
  },
  duration: {
    text: "20 分鐘",
    value: 929,
  },
};

const currentOpeningHours = {
  openNow: true,
  periods: [
    {
      open: {
        day: 0,
        hour: 11,
        minute: 30,
        date: { year: 2024, month: 8, day: 25 },
      },
      close: {
        day: 0,
        hour: 22,
        minute: 0,
        date: { year: 2024, month: 8, day: 25 },
      },
    },
    {
      open: {
        day: 0,
        hour: 11,
        minute: 30,
        date: { year: 2024, month: 8, day: 25 },
      },
      close: {
        day: 0,
        hour: 22,
        minute: 0,
        date: { year: 2024, month: 8, day: 25 },
      },
    },
    {
      open: {
        day: 0,
        hour: 11,
        minute: 30,
        date: { year: 2024, month: 8, day: 25 },
      },
      close: {
        day: 0,
        hour: 22,
        minute: 0,
        date: { year: 2024, month: 8, day: 25 },
      },
    },
  ],
  weekdayDescriptions: [
    "星期一: 休息",
    "星期二: 17:30 – 22:00",
    "星期三: 17:30 – 22:00",
    "星期四: 17:30 – 22:00",
    "星期五: 17:30 – 22:00",
    "星期六: 12:00 – 15:00, 17:30 – 22:00",
    "星期日: 12:00 – 15:00, 17:30 – 22:00",
  ],
};

export { directionsData, currentOpeningHours };
