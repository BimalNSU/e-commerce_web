import { Empty, Select, Spin } from "antd";
import { useDebounce } from "../hooks/useDebounce";
import { useState } from "react";
interface ServerOption<T> {
  value: number | string;
  label: string;
  item: T;
}
export interface ServerSearchSelectProps<T> {
  value?: number | string;
  initialOption?: T;
  onChange?: (option?: T) => void;
  // onChange?: (value: number | string, option?: T) => void;
  searchQuery: (search: string) => {
    data?: T[];
    isFetching: boolean;
  };
  getOptionValue: (item: T) => number | string;
  getOptionLabel: (item: T) => string;
  placeholder?: string;
  disabled?: boolean;
}

export function ServerSearchSelect<T>({
  // value,
  initialOption,
  onChange,
  searchQuery,
  getOptionValue,
  getOptionLabel,
  placeholder = "Search...",
  disabled,
}: ServerSearchSelectProps<T>) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500); // 500 means miliseconds;duration to hold to change
  const { data, isFetching } = searchQuery(debouncedSearch);

  const options =
    data?.map((item) => ({
      value: getOptionValue(item),
      label: getOptionLabel(item),
      item,
    })) ?? [];
  if (initialOption) {
    const initialValue = getOptionValue(initialOption);
    if (!options.some((option) => option.value === initialValue)) {
      options.unshift({
        value: initialValue,
        label: getOptionLabel(initialOption),
        item: initialOption,
      });
    }
  }

  return (
    <Select<number | string, ServerOption<T>>
      showSearch={{ filterOption: false, onSearch: setSearch }}
      allowClear
      // value={value}
      placeholder={placeholder}
      disabled={disabled}
      loading={isFetching}
      options={options}
      onChange={(_, option) => {
        if (Array.isArray(option)) {
          return;
        }
        onChange?.(option?.item);
      }}
      // onChange={(selectedValue, option) => {
      //   const selectedOption = options.find(
      //     (item) => item.value === selectedValue,
      //   );

      //   onChange?.(selectedValue, selectedOption?.item);
      // }}
      notFoundContent={
        isFetching ? (
          <Spin size="small" />
        ) : debouncedSearch.length < 2 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Type at least 2 characters"
          />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No results"
          />
        )
      }
      style={{ width: "100%" }}
    />
  );
}
