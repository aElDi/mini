import axios from "axios";

const PIPED_PROVIDERS = [
  "https://pipedapi.r4fo.com",
  "https://api.piped.privacydev.net",
  "https://pipedapi.smnz.de",
  "https://api.piped.yt",
  "https://pipedapi.drgns.space",
  "https://pipedapi.ngn.tf",
];

const YOUTUBE_REGEX = /youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})/;

export const getVideoId = (link) => YOUTUBE_REGEX.exec(link)[1];
export const testVideoId = (link) => YOUTUBE_REGEX.test(link);

// This is needed because some piped providers don't work all the time
const selectPipedProvider = async () => {
  for (let provider of PIPED_PROVIDERS) {
    try {
      const ping = await axios.head(provider + "/healthcheck");
      if (ping.status === 200) {
        return provider;
      }
    } catch (error) {
      continue;
    }
  }
};

export const cobaltFetchVideo = async (videoId) => {
  const params = {
    method: "POST",
    url: "https://api.cobalt.tools/api/json",
    headers: { "content-type": "application/json", Accept: "application/json" },
    data: { url: "https://www.youtube.com/watch?v=" + videoId },
  };
  const res = await axios.request(params);
  const srcset = { src: res.data.url, type: "video/mp4" };
  return { src: [srcset] };
};

export const pipedFetchVideo = async (videoId) => {
  const provider = await selectPipedProvider();
  const res = await axios.get(provider + "/streams/" + videoId);
  return {
    title: res.data.title,
    src: res.data.hls,
    thumbnail: res.data.thumbnailUrl,
  };
};
