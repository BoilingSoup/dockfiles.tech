import { NativeSelect } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import { ChangeEventHandler } from "react";

type Props = {
  data: string[] | undefined;
  ml?: number;
  selectValue: string;
  onChangeSelect: ChangeEventHandler<HTMLSelectElement>;
};

/**
 * Pre-populate options with default option.
 * Append options retrieved from server when data is available.
 **/
const getOptions = (defaultOption: string, data: string[] | undefined): string[] => {
  let options: string[] = [];

  if (data !== undefined) {
    options = [defaultOption, ...data];
  } else {
    options.push(defaultOption);
  }

  return options;
};

export const Select = ({ data, ml = 12, selectValue, onChangeSelect: setSelectValue }: Props) => {
  const defaultOption = "All Categories";
  const options = getOptions(defaultOption, data);

  return (
    <NativeSelect
      defaultValue={selectValue}
      onChange={setSelectValue}
      data={options}
      rightSection={<IconChevronDown size={14} />}
      rightSectionWidth={40}
      ml={ml}
    />
  );
};
