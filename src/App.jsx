import { Container, Theme, Flex } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./css/clash-display.css";
import "./css/radix-theme.css";
import { useState } from "react";
import Header from "./Header";
import VideoPlayer from "./VideoPlayer";

/** @type { import("react").FC } */
export default function App() {
  const [theme, setTheme] = useState("dark");
  const [provider, setProvider] = useState("piped")

  const toggleTheme = () =>
    theme === "dark" ? setTheme("light") : setTheme("dark");

  return (
    <Theme appearance={theme} accentColor="red">
      <Flex direction="column" gap={{ initial: "2", md: "4" }}>
        <Header toggleTheme={toggleTheme} setProvider={setProvider}/>
        <Container size={{ initial: "1", lg: "3" }}>
          <VideoPlayer provider={provider} />
        </Container>
      </Flex>
    </Theme>
  );
}
