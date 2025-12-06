export const calculateAgeDetail = (dateBirth: string) => {
  const today = new Date();
  const birth = new Date(dateBirth);

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  const days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const yearText = years > 0 ? `${years} año${years > 1 ? 's' : ''}` : null;

  const monthText =
    months > 0 ? `${months} mes${months > 1 ? 'es' : ''}` : null;

  if (yearText && monthText) return `${yearText} y ${monthText}`;
  if (yearText) return yearText;
  if (monthText) return monthText;

  return '0 meses';
};
