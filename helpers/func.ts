export const hashString = (s: string): number => {
  return s.split('').reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};

export const hashObject = (o: any): number => {
  return hashString(JSON.stringify(o));
};

export const deepCopy = (o: any): any => {
  return JSON.parse(JSON.stringify(o));
};

export const generateRandomString = function (length = 6) {
  return Math.random().toString(20).substring(2, length);
};
