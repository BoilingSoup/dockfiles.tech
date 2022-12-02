import { Center } from "@mantine/core";
import { useCategories } from "../../hooks/api/useCategories";
import { useHomeSearch } from "../../zustand-store/home/useHomeSearch";
import { Search } from "../common/Search";
import { Select } from "../common/Select";

export const HomeSearch = () => {
  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.data.map((obj) => obj.name);

  const input = useHomeSearch((state) => state.input);
  const setInput = useHomeSearch((state) => state.setInput);

  return (
    <Center style={{ width: "100%" }}>
      <Search value={input} onChange={setInput} />
      <Select data={categories} />
    </Center>
  );
};
