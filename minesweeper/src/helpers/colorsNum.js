const colorsNum = (x, y) => {
  if ((x % 2 === 0 && y % 2 !== 0) || (x % 2 !== 0 && y % 2 === 0)) {
    return "1";
  } else {
    return "0";
  }
};

export default colorsNum;
