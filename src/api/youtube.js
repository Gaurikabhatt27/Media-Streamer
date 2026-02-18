const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3/";

export async function isVideoPublic(videoId) {
  if (!videoId || videoId.length !== 11) return false;

  try {
    const res = await fetch(
      `${BASE_URL}videos?part=status&id=${videoId}&key=${API_KEY}`
    );
    const data = await res.json();
    if (!data.items || !data.items.length) return false;
    return data.items[0].status.privacyStatus === "public";
  } catch (err) {
    console.error("Error checking video status:", err);
    return false;
  }
}

export async function getTrendingVideos(maxResults = 12, regionCode = "IN") {
  try {
    const res = await fetch(
      `${BASE_URL}videos?part=snippet&chart=mostPopular&regionCode=${regionCode}&maxResults=${maxResults}&key=${API_KEY}`
    );
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.error("Error fetching trending videos:", err);
    return [];
  }
}

export const searchVideos = async (query, maxResults = 20) => {
  if (!query) return [];
  try {
    const res = await fetch(
      `${BASE_URL}search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(
        query
      )}&key=${API_KEY}`
    );
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.error("Error searching videos:", err);
    return [];
  }
};

export async function fetchFromAPI(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}&key=${API_KEY}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

export async function getRelatedVideos(videoId) {
  if (!videoId) return [];

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=10&key=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching related videos:", error);
    return [];
  }
}
