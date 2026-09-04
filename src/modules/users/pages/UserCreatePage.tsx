import { App, FormInstance, Modal, notification } from "antd";
// import { useAuthStore } from "../../auth/auth.store";
import { createUserByAdmin } from "../api/users.api";
import UserForm from "./components/UserForm";
import { User } from "../types/user.types";
// const { confirm } = Modal;

const UserCreatePage = () => {
  const { modal, notification } = App.useApp();

  const handleSubmit = (
    values: Omit<User, "id" | "isRevoked">,
    form: FormInstance,
  ) => {
    console.log(values);
    modal.confirm({
      title: "Are you sure to create new user?",
      async onOk() {
        try {
          await createUserByAdmin(values);
          form.resetFields();
          notification.success({ title: "User is created successfully" });
        } catch (e: any) {
          const errors: Record<string, string> = e.response.data.errors || {};
          if (Object.keys(errors).length) {
            form.setFields(
              Object.entries(errors).map(([key, value]) => ({
                name: key,
                errors: [value],
              })),
            );
          }
          notification.error({ title: "Fail to create" });
        }
      },
    });
  };

  return <UserForm onFinish={handleSubmit} />;
};
export default UserCreatePage;
