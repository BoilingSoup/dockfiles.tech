import { NativeSelect } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";

type Props = {
  data: string[] | undefined;
  ml?: number;
};

/**
 * Pre-populate options with default option.
 * Append options retrieved from server when data is available.
 **/
const getOptions = (
  defaultOption: string,
  data: string[] | undefined
): string[] => {
  let options: string[] = [];

  if (data !== undefined) {
    options = [defaultOption, ...data];
  } else {
    options.push(defaultOption);
  }

  return options;
};

export const Select = ({ data, ml = 12 }: Props) => {
  const defaultOption = "All Categories";
  const options = getOptions(defaultOption, data);

  return (
    <NativeSelect
      data={options}
      rightSection={<IconChevronDown size={14} />}
      rightSectionWidth={40}
      ml={ml}
    />
  );
};
