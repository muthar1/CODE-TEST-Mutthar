export function formatDate(dateString: string | null) {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);

  // Extract date components
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  // Extract time components
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Determine AM/PM suffix
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format, and handle midnight as 12

  return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
}
