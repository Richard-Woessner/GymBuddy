import { hashString } from './func';

export const logWithFileName = (fileName: string, message: string | object) => {
  const x = getNumberFromString(fileName);
  const color = `\u001b[1;3${x}m `;

  if (typeof message === 'object') {
    message = JSON.stringify(shortenObjectProperties(message, 30), null, 2);
  }

  console.log(color, `${fileName}: ${message}`);
};

export const getNumberFromString = (str: string): string | undefined => {
  try {
    const hash = hashString(str);
    const arr = hash.toString().split('');
    arr.shift();

    return arr.find((num) => parseInt(num) <= 7);
  } catch (error) {
    console.error('getNumberFromString', error);
    return '3';
  }
};
export const shortenObjectProperties = (
  obj: { [key: string]: any },
  maxLength: number,
  depth = 0
): object => {
  if (depth > 3) {
    return obj;
  }

  const newObj = { ...obj };
  for (const key in newObj) {
    if (typeof newObj[key] === 'string') {
      newObj[key] = shortenString(newObj[key], maxLength);
    } else if (typeof newObj[key] === 'object') {
      newObj[key] = shortenObjectProperties(newObj[key], maxLength, depth + 1);
    }
  }
  return newObj;
};

const shortenString = (str: string, maxLength: number): string => {
  return str.substring(0, maxLength) + (str.length > maxLength ? '...' : '');
};
