const formatDate = () => {
  let date = new Date();
  let formatted_date =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getSeconds();
  return formatted_date;
};

export default formatDate;
