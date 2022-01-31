// for use in storing user's location in db
// format it by trimming white space if any and capitalising first letter of every word
const format = (string) => {
  const words = string.trim().split(' ');
  return words.map((cur) => cur.charAt(0).toUpperCase() + cur.slice(1).toLowerCase()).join(' ');
};

export default format;
