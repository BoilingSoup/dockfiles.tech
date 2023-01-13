import { Accordion, Button, Center, useMantineTheme } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import { changePasswordAccordionStyles, changePasswordButtonSx } from "./styles";

export const ChangePasswordAccordion = () => {
  const theme = useMantineTheme();

  return (
    <Accordion
      variant="separated"
      chevron={<IconChevronDown size={16} />}
      styles={changePasswordAccordionStyles(theme)}
    >
      <Accordion.Item value="customization">
        <Accordion.Control>Change password?</Accordion.Control>
        <Accordion.Panel>
          <Center style={{ flexDirection: "column" }}>
            <Button mt="xs" mb="sm" sx={changePasswordButtonSx}>
              Change Password
            </Button>
            {/* <Text>This action can not be reversed!</Text> */}
          </Center>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
