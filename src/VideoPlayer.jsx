import { useState } from "react";
import axios from "axios";
import { Box, Flex, Spinner, TextField, Text } from "@radix-ui/themes";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { PlayIcon } from "@radix-ui/react-icons";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

const fetchVideo = async (link) => {
  const params = {
    method: "POST",
    url: "https://api.cobalt.tools/api/json",
    headers: { "content-type": "application/json", Accept: "application/json" },
    data: { url: link },
  };
  return await axios.request(params);
};

/** @type { import("react").FC } */
export default function VideoPlayer() {
  const [error, setError] = useState(null);
  const [videoSrc, setVideoSrc] = useState();
  const [videoLink, setVideoLink] = useState();
  const [isLoading, setLoading] = useState(false);

  const loadVideo = async (link) => {
    try {
      const res = await fetchVideo(link);
      setVideoSrc(res.data.url);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.text);
      setLoading(false);
    }
  };

  const keyHandler = (event) => {
    setError(null);
    if (event.key === "Enter") {
      setLoading(true);
      loadVideo(videoLink);
    }
  };

  return (
    <Flex direction="column" gap="5">
      <TextField.Root
        variant="soft"
        color="gray"
        size='3'
        placeholder="Input youtube video link..."
        onKeyDown={keyHandler}
        onInput={(event) => setVideoLink(event.target.value)}
      >
        <TextField.Slot>
          <PlayIcon />
        </TextField.Slot>
        <TextField.Slot slot="left">
          {isLoading && (
            <Box>
              <Spinner size={3} />
            </Box>
          )}
        </TextField.Slot>
      </TextField.Root>

      {error && (
        <Text color="red" dangerouslySetInnerHTML={{ __html: error }}></Text>
      )}

      {videoSrc && (
        <MediaPlayer
          style={{ borderRadius: "12px" }}
          src={{ src: videoSrc, type: "video/mp4" }}
          viewType="video"
          crossOrigin
          playsInline
        >
          <MediaProvider />
          <DefaultVideoLayout icons={defaultLayoutIcons} />
        </MediaPlayer>
      )}
    </Flex>
  );
}
