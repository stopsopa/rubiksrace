export default function compare(small, big, compare) {
  const len = small.length;

  for (let i = len - 1; i >= 0; i -= 1) {
    for (let k = len - 1; k > 0; k -= 1) {
      if (!compare(small[i][k], big[i + 1][k + 1])) {
        return false;
      }
    }
  }

  return true;
}
