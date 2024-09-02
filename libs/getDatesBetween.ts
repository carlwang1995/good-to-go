const getDateBetween = (startDate: string, endDate: string) => {
  let start: Date = new Date(startDate);
  let end: Date = new Date(endDate);
  let dates: Array<string> = [];

  while (start <= end) {
    let month = String(start.getMonth() + 1);
    let day = String(start.getDate());
    dates.push(`${month}月${day}日`);
    start.setDate(start.getDate() + 1);
  }
  return dates;
};

export { getDateBetween };
