import { Button, Center, Group, Text, TextInput } from "@mantine/core";
import { formInputStyles } from "../layout/styles";
import { formCenterStyles, formStyles } from "./styles";

export const ChangePasswordForm = () => {
  return (
    <Center style={formCenterStyles}>
      <form style={formStyles}>
        <Text component="h2" mr="auto" my={0} style={{ fontSize: "1.3rem" }}>
          Change Password
        </Text>
        <TextInput type="password" mt="lg" label="Old Password" styles={formInputStyles} />
        <TextInput type="password" mt="lg" label="New Password" styles={formInputStyles} />
        <TextInput type="password" mt="lg" label="Confirm New Password" styles={formInputStyles} />
        <Group>
          <Button mt="lg" ml="auto">
            Change Password
          </Button>
        </Group>
      </form>
    </Center>
  );
};
