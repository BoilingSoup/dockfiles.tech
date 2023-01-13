import { Accordion, Button, Center, Text, useMantineTheme } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import { deleteAccountAccordionStyles, deleteButtonSx } from "./styles";

export const DeleteAccountAccordion = () => {
  const theme = useMantineTheme();

  return (
    <Accordion
      variant="separated"
      mb={30}
      chevron={<IconChevronDown size={16} />}
      styles={deleteAccountAccordionStyles(theme)}
    >
      <Accordion.Item value="customization">
        <Accordion.Control>Delete your account?</Accordion.Control>
        <Accordion.Panel>
          <Center style={{ flexDirection: "column" }}>
            <Button mt="xs" mb="sm" sx={deleteButtonSx}>
              Delete Account
            </Button>
            <Text>This action can not be reversed!</Text>
          </Center>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
