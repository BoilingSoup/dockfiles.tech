import { Center } from "@mantine/core";
import { ChangeEventHandler } from "react";
import { useCategories } from "../../../hooks/api/useCategories";
import { Search } from "./_search";
import { Select } from "./_select";

export type SearchProps = {
  inputValue: string;
  onChangeInput: (input: string) => void;
};

type Props = SearchProps & {
  selectValue: string;
  onChangeSelect: ChangeEventHandler<HTMLSelectElement>;
};

export type LabelData = {
  value: string;
  label: string;
};

export const CategoriesSearch = ({
  inputValue,
  onChangeInput: inputChangeHandler,
  selectValue,
  onChangeSelect: setSelectValue,
}: Props) => {
  const { data: categoriesData } = useCategories();
  const categories: LabelData[] | undefined = categoriesData?.data.map((obj) => ({
    value: obj.id.toString(),
    label: obj.name,
  }));

  return (
    <Center style={{ width: "100%" }}>
      <Search inputValue={inputValue} onChangeInput={inputChangeHandler} />
      <Select data={categories} selectValue={selectValue} onChangeSelect={setSelectValue} />
    </Center>
  );
};
