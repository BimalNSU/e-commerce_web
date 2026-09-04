import { App, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { StaffProfileForm } from "./components/StaffProfileForm";
import { useCreateStaffProfile } from "../hooks/useCreateStaffProfile";
import { StaffProfileFormValues } from "../types/staff.types";

const StaffProfileCreatePage = () => {
  const { modal, notification } = App.useApp();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateStaffProfile();

  const handleSubmit = async (values: StaffProfileFormValues) => {
    console.log("values", values);
    modal.confirm({
      title: "Are you sure to update shop?",
      async onOk() {
        try {
          await mutateAsync(values);
          notification.success({
            title: "Staff profile is created successfully",
          });
          navigate("/staff-profiles");
        } catch (err) {
          notification.error({ title: "Fail to create staff profile" });
        }
      },
    });
  };

  return (
    <Card title="Create Staff Profile">
      <StaffProfileForm
        loading={isPending}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/staff-profiles")}
      />
    </Card>
  );
};
export default StaffProfileCreatePage;
