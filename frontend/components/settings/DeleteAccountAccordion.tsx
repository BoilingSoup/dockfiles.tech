import { Accordion, Button, Center, Flex, Text, useMantineTheme } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import { useState } from "react";
import { useDeleteAccountMutation } from "../../hooks/api/useDeleteAccountMutation";
import { deleteAccountAccordionStyles, deleteButtonSx } from "./styles";

export const DeleteAccountAccordion = () => {
  const theme = useMantineTheme();

  const [openConfirmation, setOpenConfirmation] = useState(false);

  const { mutate: deleteAccount } = useDeleteAccountMutation();

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
            {!openConfirmation ? (
              <Button onClick={() => setOpenConfirmation(true)} mt="xs" mb="sm" sx={deleteButtonSx}>
                Delete Account
              </Button>
            ) : (
              <Flex gap="xl">
                <Button onClick={() => setOpenConfirmation(false)} mt="xs" mb="sm" color="gray" w="100px">
                  Cancel
                </Button>
                <Button onClick={() => deleteAccount()} mt="xs" mb="sm" sx={deleteButtonSx} w="100px">
                  Confirm
                </Button>
              </Flex>
            )}
            <Text>This action can not be reversed!</Text>
          </Center>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
