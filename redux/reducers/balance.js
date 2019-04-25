import { UPDATE_BALANCE } from "../actionTypes";

const initialState = {
  balance: 0.0
};

function formatMoney(n, c, d, t) {
  var c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;

  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BALANCE:
      const { balance } = action.payload;
      return { balance: formatMoney(balance) };
    default:
      return state;
  }
}
