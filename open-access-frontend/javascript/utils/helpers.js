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

export function date2str(dateStr) {
  return dayjs(dateStr).format("MM/DD/YYYY");
}

export function validateEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

export function validateUsername(username) {
  return /^[a-z0-9_-]{3,16}$/.test(username);
}

export function removeNull(obj) {
  Object.keys(obj).forEach(
    (k) => !obj[k] && obj[k] !== undefined && obj[k] !== 0 && delete obj[k]
  );
  return obj;
}

export function findComment(comm, replyId) {
  if (comm._id == replyId) return comm;
  if (comm.replies) {
    for (let i = 0; i < comm.replies.length; i++) {
      let found = findComment(comm.replies[i], replyId);
      if (found) {
        comm.replies = [...comm.replies];
        return found;
      }
    }
  }
}

export function findAndDeleteComment(comms, id) {
  if (comms.findIndex((c) => c._id == id) > -1) {
    comms = comms.filter((c) => c._id != id);
    return comms;
  }
  for (let i = 0; i < comms.length; i++) {
    if (comms[i].replies) {
      let found = findAndDeleteComment(comms[i].replies, id);
      if (found) {
        comms[i].replies = [...found];
        return [...comms];
      }
    }
  }
  return false;
}
