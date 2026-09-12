import { Link, useParams } from "react-router-dom";
import { useStaffProfile } from "../hooks/useStaffProfile";
import Loading from "../../../components/loading";
import {
  App,
  Button,
  Descriptions,
  DescriptionsProps,
  Empty,
  FormInstance,
  Result,
} from "antd";
import { useState } from "react";
import StaffProfileForm from "./components/StaffProfileForm";
import { DATE_FORMAT } from "../../../shared/constants/date-format";
import { StaffProfileFormValues } from "../types/staff.types";
import { useUpdateStaffProfile } from "../hooks/useUpdateStaffProfile";
import dayjs from "dayjs";

const StaffProfileDetail = () => {
  const { modal, notification } = App.useApp();
  const { id } = useParams();
  const staffProfileId = Number(id);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { isLoading, data, isError } = useStaffProfile(staffProfileId);
  const { mutateAsync: updateStaffProfile, isPending } =
    useUpdateStaffProfile();
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Result status="error" />;
  }
  if (!data) {
    return <Empty />;
  }

  const items: DescriptionsProps["items"] = [
    { key: "1", label: "#", children: data.id },
    { key: "2", label: "Employee Code", children: data.employeeCode },
    { key: "3", label: "Department", children: data.department },
    { key: "4", label: "Designation", children: data.designation || "N/A" },
    {
      key: "5",
      label: "Assign Date",
      children: dayjs(data.assignDate).format(DATE_FORMAT),
    },

    {
      key: "6",
      label: "Created At",
      children: dayjs(data.createdAt).format(DATE_FORMAT),
    },
    {
      key: "7",
      label: "Shop",
      children: (
        <Link to={`/admin/shops/${data.shop.id}`}>{data.shop.name}</Link>
      ),
    },

    {
      key: "8",
      label: "User",
      children: (
        <Link to={`/admin/users/${data.user.id}`}>
          {`${data.user.firstName}${
            data.user.lastName ? ` ${data.user.lastName}` : ""
          }`}
        </Link>
      ),
    },
    {
      key: "9",
      label: "Role",
      children: (
        <Link to={`/admin/roles/${data.role.id}`}>{data.role.name}</Link>
      ),
    },
  ];

  const handleSubmit = (values: StaffProfileFormValues, form: FormInstance) => {
    modal.confirm({
      title: "Are you sure to update staff profile?",
      async onOk() {
        try {
          await updateStaffProfile({ id: staffProfileId, data: values });
          notification.success({
            title: "Staff profile is updated successfully",
          });
          form.resetFields();
          setIsEditMode(false);
        } catch (err: any) {
          const errors = err.response?.data?.errors;
          if (errors) {
            form.setFields(
              errors.map((error: any) => ({
                name: error.field,
                errors: [error.message],
              })),
            );
            notification.error({ title: "Fail to update staff profile" });
            return;
          }
          notification.error({
            title: err.response?.data?.message ?? "Something went wrong",
          });
        }
      },
    });
  };

  return !isEditMode ? (
    <>
      <Descriptions
        title="Staff Profile"
        extra={
          <Button type="primary" onClick={() => setIsEditMode(true)}>
            Edit
          </Button>
        }
        items={items}
      />
    </>
  ) : (
    <StaffProfileForm
      initialValues={data}
      onSubmit={handleSubmit}
      onCancel={() => setIsEditMode(false)}
    />
  );
};
export default StaffProfileDetail;
