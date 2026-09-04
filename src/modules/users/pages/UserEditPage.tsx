import { useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import UserForm from "./components/UserForm";
import { App, Empty, FormInstance, Result } from "antd";
import Loading from "../../../components/loading";
import { updateUserByAdmin } from "../api/users.api";
import { User } from "../types/user.types";

const UserEditPage = () => {
  const { modal, notification } = App.useApp();
  const { id } = useParams();
  const { data: user, isLoading, isError } = useUser(id);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Result status="error" />;
  }
  if (!user) {
    return <Empty />;
  }
  const handleSubmit = (
    values: Omit<User, "id" | "isRevoked">,
    form: FormInstance,
  ) => {
    console.log(values);
    modal.confirm({
      title: "Are you sure to update user?",
      async onOk() {
        try {
          await updateUserByAdmin(id!, values);
          form.resetFields();
          notification.success({ title: "User is updated successfully" });
        } catch (e: any) {
          const errors: Record<string, string> = e.response.data.errors;
          if (Object.keys(errors).length) {
            form.setFields(
              Object.entries(errors).map(([key, value]) => ({
                name: key,
                errors: [value],
              })),
            );
          }
          notification.error({ title: "Fail to update" });
        }
      },
    });
  };

  return <UserForm initialValues={user} onFinish={handleSubmit} />;
};
export default UserEditPage;
