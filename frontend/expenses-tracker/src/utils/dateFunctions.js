export function getTodayDate() {
  return new Date().toISOString().substring(0, 10);
}

export function getBeginningOfCurrentMonthDate() {
  let today = new Date();

  let timezoneOffset = today.getTimezoneOffset() * 60000;
  let daysOffset = 86400000 * (today.getDate() - 1);

  let firstDayOfCurrentMonth = 
      new Date(today.getTime() - timezoneOffset - daysOffset);

  return firstDayOfCurrentMonth.toISOString()
                               .substring(0, 10);
}
