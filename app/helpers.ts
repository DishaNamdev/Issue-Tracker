import { format } from "date-fns"
export const formatDate = (rawDate: string) => {
    // issue.createdAt
    // const dateStr = "2025-03-29T20:45:34.549Z";
    // console.log("date >> ", rawDate);
    // const date = new Date(rawDate);

    // const formattedDate = date.toLocaleDateString("en-IN"); // "29/03/2025"
    if(!rawDate) return "N/A";
    const formattedDate =  format(new Date(rawDate), "EEEE dd MMM yyyy");
    return formattedDate;
  };


export const decideColor = (status: string) => {
  if (status === "OPEN") return "#DAF7A6";
  else if (status === "CLOSE") return "#FFCDD2";
  return "#4400EE0F";
};

export const decideTextColor = (status: string) => {
  if (status === "OPEN") return "green";
  else if (status === "CLOSE") return "red";
  return "#6E56CF";
};
