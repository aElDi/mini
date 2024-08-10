import { SunIcon } from "@radix-ui/react-icons";
import { Flex, Heading, IconButton, Section } from "@radix-ui/themes";
import React from "react";

export default function Header({toggleTheme}) {
  return (
    <Section size="1" p='0'>
      <Flex direction="row" justify="between" px={{initial: "2", lg: "4"}} py={{initial: "1", lg: "2"}}>
        <Flex direction='row' align='center' gap='4'>
          <img src="./icons/Logo x64.svg" width={32} height={32} />
          <Heading>MINI</Heading>
        </Flex>
        <IconButton size={{initial: '2', md: "3"}} variant='soft' color="gray" onClick={toggleTheme}>
          <SunIcon/>
        </IconButton>
      </Flex>
    </Section>
  );
}
