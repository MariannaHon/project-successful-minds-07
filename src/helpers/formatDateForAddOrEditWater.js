export function formatDateForAddOrEditWater(originalDate) {
  const [month, day, year] = originalDate.split('-');
  const paddedMonth = month.padStart(2, '0');
  const paddedDay = day.padStart(2, '0');
  const formattedDate = `${year}-${paddedMonth}-${paddedDay}`;

  return formattedDate;
}












