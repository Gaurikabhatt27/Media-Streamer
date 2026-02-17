const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export async function getTrendingVideos() {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&maxResults=12&key=${API_KEY}`
  );

  const data = await res.json();

  console.log("YOUTUBE RESPONSE:", data);

  return data.items || [];
}

export const searchVideos = async (query) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&q=${query}&key=${API_KEY}`
  );

  const data = await res.json();

  return data.items;
};
