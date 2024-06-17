export function timeAgo(dateString) {
    // Parse the date string into a Date object
    const date = new Date(dateString);
  
    // Get the current time
    const now = new Date();
  
    // Calculate the difference in milliseconds
    const diffInMs = now - date;
  
    // Convert milliseconds to seconds, minutes, hours, days, etc.
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    // Determine the appropriate unit and format the output
    let unit;
    let timeAgo;
    if (days > 0) {
      unit = days === 1 ? "day" : "days";
      timeAgo = days + " " + unit;
    } else if (hours > 0) {
      unit = hours === 1 ? "hour" : "hours";
      timeAgo = hours + " " + unit;
    } else if (minutes > 0) {
      unit = minutes === 1 ? "minute" : "minutes";
      timeAgo = minutes + " " + unit;
    } else {
      unit = seconds === 1 ? "second" : "seconds";
      timeAgo = seconds + " " + unit;
    }
  
    return timeAgo + " ago";
  }
  
  // Example usage
  const dateString = "2024-04-18T09:20:01.947Z";  // Replace with your actual date string
  const timeAgoStr = timeAgo(dateString);
  
  console.log(timeAgoStr);  // Output: 25 days ago (assuming today is May 12, 2024)
  