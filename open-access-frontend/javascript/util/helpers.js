import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export function num2str(val) {
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

export function date2rel(dateStr) {
  dayjs.extend(relativeTime);
  return dayjs(dateStr).from(dayjs());
}
