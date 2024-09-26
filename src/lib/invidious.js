import axios from "axios";

const INSTANCES = [
  "https://inv.nadeko.net/api/v1",
  "https://invidious.nerdvpn.de/api/v1",
  "https://invidious.jing.rocks/api/v1",
  "https://invidious.privacyredirect.com/api/v1",
];

const selectInstance = async () => {
  for (let instance of INSTANCES) {
    try {
      const ping = await axios.head(instance + "/trending");
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
  const res = await axios.get(provider + "/videos/" + videoId + "?local=true");
  return {
    title: res.data.title,
    src: [
      { src: res.data.dashUrl + "?local=true", type: "application/dash+xml" },
    ],
    thumbnail: res.data.videoThumbnails[0].url,
  };
};
