let words = [
  'GRIS',
  'NACHITA',
  'ANDREINA',
  'COMPUTADORA',
  'COCINA',
  'VETERINARIA',
  'AGUACATE',
  'CELULAR',
  'IMPRESORA',
  'TELEVISION',
];

export const getRandowmWord = () => {
  const randomIndexes = Math.floor(Math.random() * words.length);
  return words[randomIndexes];
};
