import { Center } from "@mantine/core";
import { useCategories } from "../../../hooks/api/useCategories";
import { Search } from "./_Search";
import { Select } from "./_Select";

export type SearchProps = {
  value: string;
  onChange: (input: string) => void;
};

export const CategoriesSearch = ({ value, onChange: setInput }: SearchProps) => {
  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.data.map((obj) => obj.name);

  return (
    <Center style={{ width: "100%" }}>
      <Search value={value} onChange={setInput} />
      <Select data={categories} />
    </Center>
  );
};
