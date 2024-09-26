import axios from "axios";

const INSTANCES = [
  "https://pipedapi.r4fo.com",
  "https://api.piped.privacydev.net",
  "https://pipedapi.smnz.de",
  "https://api.piped.yt",
  "https://pipedapi.drgns.space",
  "https://pipedapi.ngn.tf",
];

const selectInstance = async () => {
    for (let instance of INSTANCES) {
      try {
        const ping = await axios.head(instance + "/streams/jNQXAC9IVRw");
        if (ping.status === 200) {
          return instance;
        }
      } catch (error) {
        continue;
      }
    }
  };

export const fetchVideo = async (videoId) => {
  const provider = await selectInstance();
  const res = await axios.get(provider + "/streams/" + videoId);
  return {
    title: res.data.title,
    src: res.data.hls,
    thumbnail: res.data.thumbnailUrl,
  };
};
