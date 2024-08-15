import { Container, Theme, Flex} from "@radix-ui/themes";

import { useState } from "react";
import Header from "../components/Header";
import VideoPlayer from "../components/VideoPlayer";

export default function Root() {
  const [theme, setTheme] = useState("dark");
  const [provider, setProvider] = useState("piped");

  const toggleTheme = () =>
    theme === "dark" ? setTheme("light") : setTheme("dark");

  return (
    <Theme appearance={theme} accentColor="red">
      <Flex direction="column" gap={{ initial: "3", md: "4" }}>
        <Header toggleTheme={toggleTheme} setProvider={setProvider} />
        <Container size={{ initial: "1", lg: "3" }}>
          <VideoPlayer provider={provider} setProvider={setProvider}/>
        </Container>
      </Flex>
    </Theme>
  );
}
