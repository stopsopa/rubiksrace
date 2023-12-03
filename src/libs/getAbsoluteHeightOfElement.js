export default function getAbsoluteHeightOfElement(el) {
  var styles = window.getComputedStyle(el);
  var margin = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);

  return Math.ceil(el.offsetHeight + margin); // excluding only margin
}
