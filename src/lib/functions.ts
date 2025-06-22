const dayItems = {
  "0": "Sunday",
  "1": "Monday",
  "2": "Tuesday",
  "3": "Wednesday",
  "4": "Thursday",
  "5": "Friday",
  "6": "Saturday"
};

const monthItems = {
  "0": "January",
  "1": "February",
  "2": "March",
  "3": "April",
  "4": "May",
  "5": "June",
  "6": "July",
  "7": "August",
  "8": "September",
  "9": "October",
  "10": "November",
  "11": "December"
};

export function convertDate(date: Date) {
  const day = date.getDay().toString() as
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6";

  const month = date.getMonth().toString() as
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11";
  return `${dayItems[day]}, ${monthItems[month]} ${date.getDate()}`;
}
