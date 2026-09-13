import { ServerSearchSelect } from "../../../shared/components/ServerSearchSelect";
import { useUserOptions } from "../hooks/useUserOptions";
import { UserOption } from "../types/user.types";

//form will automatically pass UserSelectProps from form state
interface UserSelectProps {
  value?: UserOption;
  onChange?: (user?: UserOption) => void;
}

const UserSelect = ({ value, onChange }: UserSelectProps) => {
  return (
    <ServerSearchSelect
      value={value?.id}
      initialOption={value}
      onChange={onChange}
      searchQuery={useUserOptions}
      getOptionValue={(user) => user.id}
      getOptionLabel={(u) =>
        `${u.firstName}${u.lastName ? ` ${u.lastName}` : ""} <<${u.mobile}>>`
      }
      placeholder="Search user..."
    />
  );
};
export default UserSelect;
