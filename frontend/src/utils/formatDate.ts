export const formatDate = (fecha: string) => {
  return new Date(fecha).toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
