import { Button, Loader, SpacingValue, SystemProp, Text } from "@mantine/core";
import { ReactElement } from "react";

type Props = {
  mt?: SystemProp<SpacingValue>;
  my?: SystemProp<SpacingValue>;
  mx?: SystemProp<SpacingValue>;
  mb?: SystemProp<SpacingValue>;
  mr?: SystemProp<SpacingValue>;
  ml?: SystemProp<SpacingValue>;
  variant?: "gradient" | "filled" | "outline" | "subtle" | "light" | "white" | "default";
  label: string;
  icon: ReactElement;
  isLoading?: boolean;
  onClick: () => void;
};

export const LabeledActionButton = ({
  mt,
  my = "auto",
  mx,
  mb,
  mr,
  ml,
  variant = "filled",
  label,
  icon,
  isLoading = false,
  onClick: clickHandler,
}: Props) => {
  const content = isLoading ? (
    <Loader color="gray" size="xs" />
  ) : (
    <>
      <Text component="span">{label}</Text>
      {icon}
    </>
  );

  return (
    <Button onClick={clickHandler} mt={mt} mb={mb} mr={mr} ml={ml} my={my} mx={mx} variant={variant}>
      {content}
    </Button>
  );
};
