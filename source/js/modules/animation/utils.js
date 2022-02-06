function outElastic(x) {
  const c4 = (2 * Math.PI) / 3;

  if (x === 0) {
    return 0;
  } else if (x === 1) {
    return 1;
  } else {
    return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  }
}

function linear(x) {
  return x;
}

function inQuad(x) {
  return x * x;
}
function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4);
}

export const ease = {
  outElastic,
  linear,
  inQuad,
  easeOutQuart
};
