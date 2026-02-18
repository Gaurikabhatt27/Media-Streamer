export function formatViews(views) {
  if (!views || isNaN(views)) return "No views";

  const num = Number(views);

  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B views";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M views";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K views";

  return num + " views";
}

export function timeAgo(date) {
  if (!date) return "";

  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 }
  ];

  for (let i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) {
      return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}
