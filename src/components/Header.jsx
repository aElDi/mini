import { SunIcon } from "@radix-ui/react-icons";
import {
  Flex,
  Heading,
  IconButton,
  Section,
  SegmentedControl,
} from "@radix-ui/themes";

/** @type { import("react").FC } */
export default function Header({ toggleTheme, setProvider }) {
  return (
    <Section size="1" p="0">
      <Flex
        direction="row"
        justify="between"
        px={{ initial: "2", lg: "4" }}
        py={{ initial: "1", lg: "2" }}
      >
        <Flex direction="row" align="center" gap="4">
          <img alt="logo" src="./icons/Logo x64.svg" width={32} height={32} />
          <Heading>MINI</Heading>
        </Flex>
        <Flex direction="row" gap={{ initial: "2", lg: "4" }} align="center">
          <SegmentedControl.Root
            defaultValue="piped"
            onValueChange={setProvider}
          >
            <SegmentedControl.Item value="piped">Piped</SegmentedControl.Item>
            <SegmentedControl.Item value="invidious">Invidious</SegmentedControl.Item>
            <SegmentedControl.Item value="cobalt">Cobalt</SegmentedControl.Item>
          </SegmentedControl.Root>

          <IconButton
            size={{ initial: "2", md: "3" }}
            variant="soft"
            color="gray"
            onClick={toggleTheme}
          >
            <SunIcon />
          </IconButton>
        </Flex>
      </Flex>
    </Section>
  );
}
