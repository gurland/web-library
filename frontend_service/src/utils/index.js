export const getFullDate = (dateObj = new Date()) => {
  const _format = (...values) => values.map(value => value > 9 ? value : '0' + value);

  const year = dateObj.getFullYear();
  const [
    month,
    day
  ] = _format(
    dateObj.getMonth() + 1,
    dateObj.getDate()
  );

  return `${year}-${month}-${day}`;
}