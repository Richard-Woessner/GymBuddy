import { hashString } from './func';

export const logWithFileName = (fileName: string, message: string) => {
  const x = getNumberFromString(fileName);
  const color = `\u001b[1;3${x}m `;

  console.log(color, `${fileName}: ${message}`);
};

export const getNumberFromString = (str: string): string | undefined => {
  const hash = hashString(str);
  const arr = hash.toString().split('');
  arr.shift();

  return arr.find((num) => parseInt(num) <= 7);
};
