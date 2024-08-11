import axios from "axios";

const PIPED_PROVIDERS = [
  "https://pipedapi.r4fo.com/",
  "https://pipedapi.in.projectsegfau.lt",
  "https://pipedapi.smnz.de",
  "https://api.piped.yt",
];

const VIDEO_ID_REGEX = new RegExp(
  /youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})/
);

// This is needed because some piped providers don't work all the time
const selectPipedProvider = async () => {
  for (let provider of PIPED_PROVIDERS) {
    try {
      const ping = await axios.get(provider + "streams/jNQXAC9IVRw");
      if (ping.status === 200) {
        return provider;
      }
    } catch (error) {
      continue;
    }
  }
};

export const cobaltFetchVideo = async (link) => {
  const params = {
    method: "POST",
    url: "https://api.cobalt.tools/api/json",
    headers: { "content-type": "application/json", Accept: "application/json" },
    data: { url: link },
  };
  const res = await axios.request(params);
  const srcset = { src: res.data.url, type: "video/mp4" };
  return [srcset];
};

export const pipedFetchVideo = async (link) => {
  const provider = await selectPipedProvider();
  const videoId = link.match(VIDEO_ID_REGEX)[1];
  const res = await axios.get(provider + "streams/" + videoId);
  console.log(res);
  return {
    title: res.data.title,
    src: res.data.hls,
    thumbnail: res.data.thumbnailUrl,
  };
};
