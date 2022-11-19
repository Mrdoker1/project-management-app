function getRandom(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// const isObjKey = <T>(key: string): key is keyof T => key in T;

function removeObjKey<T extends object>(obj: T, key: string) {
  const res = { ...obj };
  // if (res && typeof res === 'object' && res.hasOwnProperty(key)) {
  if (key in res) {
    delete res[key as keyof typeof res];
    //const { key, ...end } = res;
    return res;
  } else throw new Error();
}

export { getRandom, removeObjKey };
