function prefix(num: number | string) {
  if (typeof num === 'string') num = parseInt(num);

  return `${num < 10 ? '0' : ''}${num}`;
}

export default prefix;
