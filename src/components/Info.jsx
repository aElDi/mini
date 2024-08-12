import { ArrowTopRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  Grid,
  Flex,
  Box,
  Text,
  Link,
  Heading,
  Blockquote,
} from "@radix-ui/themes";

const responsiveGap = { initial: "2", md: "3" };

export default function Info() {
  return (
    <Grid
      my="4"
      columns={{ initial: "1", md: "2" }}
      rows="1"
      gap={responsiveGap}
    >
      <Flex direction="column" gap={responsiveGap}>
        <Box className="default-box" p={responsiveGap}>
          <Flex direction="column" gap={responsiveGap}>
            <Heading size="5" weight="medium">
              YouTube video player
            </Heading>
            <Text color="gray">
              With MINI you can watch any video from YouTube despite slowdowns
              and limitations, completely anonymously using API services{" "}
              <Link href="https://cobalt.tools">cobalt.tools</Link> and{" "}
              <Link href="https://piped.video">piped.video</Link>. Just paste
              the link to the YouTube video and press Enter
            </Text>
          </Flex>
        </Box>
        <Box className="default-box" p={responsiveGap}>
          <Flex direction="column" gap={responsiveGap}>
            <Heading size="5" weight="medium">
              Source code
            </Heading>
            <Text color="gray">
              <Link href="https://github.com/aElDi/mini">
                <Flex gap="3">
                  <GitHubLogoIcon width={18} height={18} />
                  <span>
                    GitHub <ArrowTopRightIcon color="gray" />
                  </span>
                </Flex>
              </Link>
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Box className="default-box" p={responsiveGap}>
        <Flex direction="column" gap={responsiveGap}>
          <Heading size="5" weight="medium">
            API Providers
          </Heading>
          <Flex gap={responsiveGap} direction='column'>
            <Flex direction='column' width='100%' gap='1'>
              <Text weight="medium" size="5">
                Cobalt.tools
              </Text>
              <Blockquote color="gray">
                API for downloading videos from youtube. Since it returns a
                stream for downloading without Partial Content support,
                rewinding is not possible
              </Blockquote>
            </Flex>
            <Flex direction='column' gap='1'>
              <Text weight="medium" size="5">
                Piped.video
              </Text>
              <Blockquote color="gray">
                A free platform for anonymous YouTube browsing. Used by default. You can change this with the top right switch
              </Blockquote>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Grid>
  );
}
