import moment from "moment";

export const formatDate = (dateString) => {
  return moment(dateString).format("MMM D, YYYY, h:mm A"); // Example: November 5, 2024, 3:20 PM
};
