import { ServerSearchSelect } from "../../../shared/components/ServerSearchSelect";
import { useUserOptions } from "../hooks/useUserOptions";
import { UserOption } from "../types/user.types";
interface UserSelectProps {
  value?: UserOption; //get value automatically from form state
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
