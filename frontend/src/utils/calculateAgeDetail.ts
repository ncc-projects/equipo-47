export const calculateAgeDetail = (fechaNacimiento: string) => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);

  let years = hoy.getFullYear() - nacimiento.getFullYear();
  let months = hoy.getMonth() - nacimiento.getMonth();
  const days = hoy.getDate() - nacimiento.getDate();

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
