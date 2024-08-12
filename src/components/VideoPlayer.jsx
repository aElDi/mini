import { useEffect, useState } from "react";
import { cobaltFetchVideo, getVideoId, pipedFetchVideo } from "../lib/api";
import { Box, Flex, Spinner, TextField, Text, Tooltip } from "@radix-ui/themes";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import { PlayIcon } from "@radix-ui/react-icons";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import Info from "./Info";
import { useSearchParams } from "react-router-dom";

/** @type { import("react").FC } */
export default function VideoPlayer({ provider }) {
  const [error, setError] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoLink, setVideoLink] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Set as default method
  const loadVideoPiped = async (videoId) => {
    try {
      const video = await pipedFetchVideo(videoId);
      setVideo(video);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
    setLoading(false);
  };

  const loadVideoCobalt = async (videoId) => {
    try {
      const srcset = await cobaltFetchVideo(videoId);
      setVideo({ src: srcset });
    } catch (error) {
      setError(error.response.data.text);
    }
    setLoading(false);
  };

  const loadVideo = (videoId) => {
    setLoading(true);
    const v = videoId;
    setSearchParams({ v });
    if (provider === "piped") {
      loadVideoPiped(v);
    } else if (provider === "cobalt") {
      loadVideoCobalt(v);
    }
  };

  const keyHandler = (event) => {
    setError(null);
    if (event.key === "Enter" && videoLink) {
      loadVideo(getVideoId(videoLink));
    }
  };

  useEffect(() => {
    if (searchParams.has("v")) {
      const videoId = searchParams.get("v");
      loadVideo(videoId);
    }
  }, [searchParams]);

  return (
    <Flex direction="column" gap={{ initial: "1", md: "3" }}>
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
          title={video.title}
          viewType="video"
          crossOrigin
          playsInline
        >
          <MediaProvider>
            <Poster className="vds-poster" alt="Video thumbnail" src={video.thumbnail}/>
          </MediaProvider>
          <DefaultVideoLayout
            icons={defaultLayoutIcons}
          />
        </MediaPlayer>
      ) : (
        <Info />
      )}
    </Flex>
  );
}
