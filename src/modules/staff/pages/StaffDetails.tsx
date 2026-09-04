import { useParams } from "react-router-dom";
import { useStaffProfile } from "../hooks/useStaffProfile";
import Loading from "../../../components/loading";
import {
  App,
  Descriptions,
  DescriptionsProps,
  Empty,
  FormInstance,
  Result,
} from "antd";
import { useState } from "react";
import { StaffProfileForm } from "./components/StaffProfileForm";
import { DATE_FORMAT } from "../../../shared/constants/date-format";
import { StaffProfileFormValues } from "../types/staff.types";
import { useUpdateStaffProfile } from "../hooks/useUpdateStaffProfile";
import dayjs from "dayjs";

const StaffProfile = () => {
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
    {
      key: "1",
      label: "#",
      children: <p>{data.id}</p>,
    },
    {
      key: "2",
      label: "Employee Code",
      children: <p>{data.employeeCode}</p>,
    },
    {
      key: "3",
      label: "Department",
      children: <p>{data.department}</p>,
    },
    {
      key: "4",
      label: "Designation",
      children: <p>{data.designation}</p>,
    },
    {
      key: "5",
      label: "Assign Date",
      children: <p>{dayjs(data.assignDate).format(DATE_FORMAT)}</p>,
    },

    {
      key: "6",
      label: "Created At",
      children: <p>{dayjs(data.createdAt).format(DATE_FORMAT)}</p>,
    },
    {
      key: "7",
      label: "Shop",
      children: <p>{data.shop.name}</p>,
    },

    {
      key: "8",
      label: "User",
      children: (
        <p>{`${data.user.firstName}${
          data.user.lastName ? ` ${data.user.lastName}` : ""
        }`}</p>
      ),
    },
    {
      key: "9",
      label: "Role",
      children: <p>{data.role.name}</p>,
    },
  ];

  const handleSubmit = (values: StaffProfileFormValues, form: FormInstance) => {
    modal.confirm({
      title: "Are you sure to update staff profile?",
      async onOk() {
        try {
          await updateStaffProfile({ id: staffProfileId, data: values });
          notification.success({
            title: "Staff profile is created successfully",
          });
          form.resetFields();
          setIsEditMode(false);
        } catch (err) {
          notification.error({ title: "Fail to create staff profile" });
        }
      },
    });
  };
  return isEditMode ? (
    <>
      <Descriptions items={items} />
    </>
  ) : (
    <StaffProfileForm
      initialValues={data}
      onSubmit={handleSubmit}
      onCancel={() => setIsEditMode(false)}
    />
  );
};
export default StaffProfile;
