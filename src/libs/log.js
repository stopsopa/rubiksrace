const log = (function () {
  try {
    return (...args) => console.log(`rubiks.js log`, ...args);
  } catch (e) {
    return () => {};
  }
})();

export default log;
