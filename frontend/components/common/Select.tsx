import { NativeSelect } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";

type Props = {
  data: string[] | undefined;
};

export const Select = ({ data }: Props) => {
  return (
    <NativeSelect
      label="Category"
      placeholder="Select Category"
      data={data ?? [""]}
      rightSection={<IconChevronDown size={14} />}
      rightSectionWidth={40}
    />
  );
};
