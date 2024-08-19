import axios from "axios";

const API_URL = "https://api.cobalt.tools/api/json";

export const fetchVideo = async (videoId) => {
  /**@type {import("axios").AxiosRequestConfig} */
  const params = {
    method: "POST",
    url: API_URL,
    headers: { "content-type": "application/json", Accept: "application/json" },
    data: { url: "https://www.youtube.com/watch?v=" + videoId },
  };
  const res = await axios.request(params);
  const srcset = { src: res.data.url, type: "video/mp4" };
  return { src: [srcset] };
};
