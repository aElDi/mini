import { SunIcon } from "@radix-ui/react-icons";
import {
  Flex,
  Heading,
  IconButton,
  Section,
  Select,
} from "@radix-ui/themes";

/** @type { import("react").FC } */
export default function Header({ toggleTheme, setProvider }) {
  return (
    <Section size="1" p="0">
      <Flex
        direction="row"
        justify="between"
        px={{ initial: "1", lg: "4" }}
        py={{ initial: "1", lg: "2" }}
      >
        <Flex
          direction="row"
          align="center"
          gap={{ initial: "2", md: "4" }}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <img alt="logo" src="./icons/Logo x64.svg" width={32} height={32} />
          <Heading>MINI</Heading>
        </Flex>
        <Flex direction="row" gap={{ initial: "2", lg: "4" }} align="center">
          <Select.Root
            defaultValue="piped"
            onValueChange={setProvider}
            size={{initial: "2", md: "3"}}
          >
            <Select.Trigger/>
            <Select.Content>
              <Select.Item value="piped">Piped</Select.Item>
              <Select.Item value="invidious">Invidious</Select.Item>
              <Select.Item value="cobalt">Cobalt</Select.Item>
            </Select.Content>
          </Select.Root>

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
