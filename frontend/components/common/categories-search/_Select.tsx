import { NativeSelect } from "@mantine/core";
import { ChangeEventHandler } from "react";
import { ALL_CATEGORIES } from "../../../zustand-store/types";
import { selectSx } from "../styles";
import { LabelData } from "./CategoriesSearch";

type Props = {
  data: { label: string; value: string }[] | undefined;
  ml?: number;
  selectValue: string;
  onChangeSelect: ChangeEventHandler<HTMLSelectElement>;
};

/**
 * Pre-populate options with default option.
 * Append options retrieved from server when data is available.
 **/
const getOptions = (defaultOption: LabelData, data: LabelData[] | undefined): LabelData[] => {
  if (data !== undefined) {
    return [defaultOption, ...data];
  }

  return [defaultOption];
};

export const Select = ({ data, ml = 12, selectValue, onChangeSelect: setSelectValue }: Props) => {
  const defaultOption: LabelData = { label: ALL_CATEGORIES, value: ALL_CATEGORIES };
  const options = getOptions(defaultOption, data);

  return (
    <NativeSelect
      defaultValue={selectValue}
      onChange={setSelectValue}
      data={options}
      rightSectionWidth={40}
      ml={ml}
      sx={selectSx}
    />
  );
};
