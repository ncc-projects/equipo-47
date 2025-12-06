export const getDaysUntil = (dateString: string): number => {
  const today = new Date();

  const [year, month, day] = dateString.split('-').map(Number);
  const targetUTC = Date.UTC(year, month - 1, day);

  const todayUTC = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const diffMs = targetUTC - todayUTC;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays;
};
