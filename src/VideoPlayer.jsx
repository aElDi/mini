import { useState } from "react";
import { cobaltFetchVideo, pipedFetchVideo } from "./lib/api";
import {
  Box,
  Flex,
  Spinner,
  TextField,
  Text,
  Tooltip
} from "@radix-ui/themes";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { PlayIcon } from "@radix-ui/react-icons";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import Info from "./Info";

/** @type { import("react").FC } */
export default function VideoPlayer({ provider }) {
  const [error, setError] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoLink, setVideoLink] = useState("");
  const [isLoading, setLoading] = useState(false);

  // Set as default method
  const loadVideoPiped = async (link) => {
    try {
      const video = await pipedFetchVideo(link);
      setVideo(video);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
    setLoading(false);
  };

  const loadVideoCobalt = async (link) => {
    try {
      const srcset = await cobaltFetchVideo(link);
      setVideo({ src: srcset });
    } catch (error) {
      setError(error.response.data.text);
    }
    setLoading(false);
  };

  const keyHandler = (event) => {
    setError(null);
    if (event.key === "Enter" && videoLink) {
      setLoading(true);
      if (provider === "piped") {
        loadVideoPiped(videoLink);
      } else if (provider === "cobalt") {
        loadVideoCobalt(videoLink);
      }
    }
  };

  return (
    <Flex direction="column" gap={{initial: '1', md: '3'}}>
      <Tooltip content="Paste link to YouTube video and press Enter">
        <TextField.Root
          variant="soft"
          color="gray"
          size="3"
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
      </Tooltip>

      {error && (
        <Text
          color="red"
          mx="2"
          dangerouslySetInnerHTML={{ __html: error }}
        ></Text>
      )}

      {video ? (
        <MediaPlayer
          style={{ borderRadius: "12px" }}
          src={video.src}
          title={video.title && ""}
          viewType="video"
          crossOrigin
          playsInline
        >
          <MediaProvider />
          <DefaultVideoLayout
            thumbnails={video.thumbnail && ""}
            icons={defaultLayoutIcons}
          />
        </MediaPlayer>
      ) : (
        <Info/>
      )}
    </Flex>
  );
}
