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

export async function getRelatedVideos(videoId) {
  if (!videoId) return [];

  try {
    const videoRes = await fetch(
      `${BASE_URL}videos?part=snippet&id=${videoId}&key=${API_KEY}`
    );
    const videoData = await videoRes.json();

    if (!videoData.items || !videoData.items.length) return [];

    const title = videoData.items[0].snippet.title;

    const query = title.split(" ").slice(0, 3).join(" ");

    const searchRes = await fetch(
      `${BASE_URL}search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(
        query
      )}&regionCode=IN&key=${API_KEY}`
    );

    const searchData = await searchRes.json();

    if (!searchData.items) return [];

    return searchData.items.filter(
      (item) => item.id.videoId !== videoId
    );

  } catch (err) {
    console.error("Recommendation fetch failed:", err);
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


async function getVideoDetails(videoId) {
  try {
    const res = await fetch(
      `${BASE_URL}videos?part=snippet&id=${videoId}&key=${API_KEY}`
    );
    const data = await res.json();

    if (!data.items || !data.items.length) return null;

    return data.items[0].snippet.categoryId;
  } catch (e) {
    console.error("Video details error:", e);
    return null;
  }
}
