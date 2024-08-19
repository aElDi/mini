import { useEffect, useState } from "react";
import { getVideoId } from "@/lib/utils";
import { Flex, TextField, Button, Code, Box } from "@radix-ui/themes";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import { PlayIcon } from "@radix-ui/react-icons";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
  DefaultAudioLayout,
} from "@vidstack/react/player/layouts/default";
import Info from "./Info";
import { useSearchParams } from "react-router-dom";

/** @type { import("react").FC } */
export default function VideoPlayer({ provider }) {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [video, setVideo] = useState(null);
  const [videoLink, setVideoLink] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const loadVideo = async (videoId) => {
    setError(false);
    setLoading(true);
    setSearchParams({ v: videoId, provider });
    try {
      let video = {};
      let fetcher;
      switch (provider) {
        case "piped":
          fetcher = await import("../lib/piped");
          video = await fetcher.fetchVideo(videoId);
          break;
        case "cobalt":
          fetcher = await import("../lib/cobalt")
          video = await fetcher.fetchVideo(videoId);
          break;
        case "invidious":
          fetcher = await import("../lib/invidious")
          video = await fetcher.fetchVideo(videoId);
          break;
        default:
          break;
      }
      setVideo(video);
    } catch (error) {
      console.log(error);
      setError(JSON.stringify(error.response.data, null, "\t"));
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      if (searchParams.has("v")) {
        const videoId = searchParams.get("v");
        setVideoLink("https://youtu.be/" + videoId);
        await loadVideo(videoId);
      }
    })();
  }, [searchParams]);

  const handleKeyDown = async (ev) => {
    if (ev.keyCode === 13) {
      // enter button
      await loadVideo(getVideoId(videoLink));
    }
  };

  return (
    <Flex direction="column" gap={{ initial: "2", md: "3" }}>
      <Flex
        direction="row"
        align="center"
        gap={{ initial: "1", md: "3" }}
        width="100%"
      >
        <TextField.Root
          variant="soft"
          color="gray"
          size="3"
          placeholder="Input youtube video link..."
          value={videoLink}
          onInput={(event) => setVideoLink(event.target.value)}
          onKeyDown={handleKeyDown}
        >
          <TextField.Slot>
            <PlayIcon />
          </TextField.Slot>
        </TextField.Root>
        <Box display={{ initial: "none", md: "block" }}>
          <Button
            variant="soft"
            size="3"
            loading={isLoading}
            onClick={async () => loadVideo(getVideoId(videoLink))}
          >
            Enter
          </Button>
        </Box>
      </Flex>

      {error && (
        <Code color="red" mx="2" wrap="pretty">
          {error}
        </Code>
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
            <Poster
              className="vds-poster"
              alt="Video thumbnail"
              src={video.thumbnail}
            />
          </MediaProvider>
          <DefaultVideoLayout icons={defaultLayoutIcons} />
          <DefaultAudioLayout icons={defaultLayoutIcons} />
        </MediaPlayer>
      ) : (
        <Info />
      )}
    </Flex>
  );
}
