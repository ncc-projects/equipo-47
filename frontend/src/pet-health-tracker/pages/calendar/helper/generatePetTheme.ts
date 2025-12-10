export const generatePetTheme = (index: number) => {
  const hue = (index * 137.508) % 360;

  const saturation = 70;
  const lightness = 75;

  const mainColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  const chipColor = `hsl(${hue}, 80%, 94%)`;

  const isDarkText = lightness > 60;

  return {
    mainColor,
    chipColor,
    isDarkText,
  };
};
