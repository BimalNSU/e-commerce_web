import { App, Card, FormInstance } from "antd";
import { useNavigate } from "react-router-dom";
import StaffProfileForm from "./components/StaffProfileForm";
import { useCreateStaffProfile } from "../hooks/useCreateStaffProfile";
import { StaffProfileFormValues } from "../types/staff.types";

const StaffProfileCreatePage = () => {
  const { modal, notification } = App.useApp();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateStaffProfile();

  const handleSubmit = async (
    values: StaffProfileFormValues,
    form: FormInstance,
  ) => {
    console.log("values", values);
    modal.confirm({
      title: "Are you sure to create new staff profile?",
      async onOk() {
        try {
          await mutateAsync(values);
          notification.success({
            title: "Staff profile is created successfully",
          });
          // navigate("/staff-profiles");
        } catch (err: any) {
          const errors = err.response?.data?.errors;
          if (errors) {
            form.setFields(
              errors.map((error: any) => ({
                name: error.field,
                errors: [error.message],
              })),
            );
            notification.error({ title: "Fail to create staff profile" });
            return;
          }
          notification.error({
            title: err.response?.data?.message ?? "Something went wrong",
          });
        }
      },
    });
  };

  return (
    <Card title="Create Staff Profile">
      <StaffProfileForm
        loading={isPending}
        onSubmit={handleSubmit}
        onCancel={() => navigate("admin/staff-profiles")}
      />
    </Card>
  );
};
export default StaffProfileCreatePage;
