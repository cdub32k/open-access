import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export function num2str(val) {
  if (val < 999) return val;
  if (!val) return "-";

  var s = ["", "k", "m", "b", "t"];

  var sNum = Math.floor(("" + val).length / 3);

  var sVal = parseFloat(
    (sNum != 0 ? val / Math.pow(1000, sNum) : val).toPrecision(4)
  );

  if (sVal % 1 != 0) {
    sVal = sVal.toFixed(2);
  }

  return sVal + s[sNum];
}

export function thousandsSeparators(num) {
  if (!num || num < 1000) return num;
  let numParts = num.toString().split(".");
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return numParts.join(".");
}

export function date2rel(dateStr) {
  dayjs.extend(relativeTime);
  return dayjs(dateStr).from(dayjs());
}