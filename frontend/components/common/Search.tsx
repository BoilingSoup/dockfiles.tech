import { Autocomplete } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

export const Search = () => {
  return (
    <Autocomplete
      placeholder="Search"
      style={{ width: "80%", maxWidth: "570px" }}
      icon={<IconSearch size={16} stroke={1.5} />}
      data={[]}
    />
  );
};
