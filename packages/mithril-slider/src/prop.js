
export default x => {
  let p = x;
  return args => {
    if (args === undefined) {
      return p;
    } else {
      p = args;
    }
  };
};
