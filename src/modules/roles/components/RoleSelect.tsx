import { Select } from "antd";
import { useRoleOptions } from "../hooks/useRoleOptions";
import { RoleOption } from "../api/roles.api";
import { useMemo } from "react";
interface RoleSelectProps {
  value?: RoleOption;
  onChange?: (value?: RoleOption) => void;
}

export function RoleSelect({ value, onChange }: RoleSelectProps) {
  const { data, isLoading } = useRoleOptions();

  const options = useMemo(
    () =>
      data?.map((role) => ({
        value: role.id,
        label: role.name,
        role,
      })) ?? [],
    [data],
  );

  return (
    <Select
      showSearch={{ optionFilterProp: "label" }}
      allowClear
      value={value?.id}
      onChange={(_, option) => {
        if (Array.isArray(option)) {
          return;
        }
        onChange?.(option?.role);
      }}
      loading={isLoading}
      placeholder="Select role..."
      options={options}
      style={{ width: "100%" }}
    />
  );
}
