import { ServerSearchSelect } from "../../../shared/components/ServerSearchSelect";
import { useUserOptions } from "../hooks/useUserOptions";
import { UserOption } from "../types/user.types";
interface UserSelectProps {
  // value?: UserId;
  value?: UserOption;
  initialOption?: UserOption;
  // onChange?: (value: number | string) => void;
  onChange?: (user?: UserOption) => void;
}

export function UserSelect({
  value,
  initialOption,
  onChange,
}: UserSelectProps) {
  return (
    <ServerSearchSelect
      // value={value?.id}
      initialOption={initialOption}
      onChange={onChange}
      searchQuery={useUserOptions}
      getOptionValue={(user) => user.id}
      getOptionLabel={(u) =>
        `${u.firstName}${u.lastName ? ` ${u.lastName}` : ""} <<${u.mobile}>>`
      }
      placeholder="Search user..."
    />
  );
}
