import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Select,
  Space,
} from "antd";
import {
  StaffStatus,
  StaffProfileFormValues,
  StaffProfileDetail,
} from "../../types/staff.types";
import * as validator from "../../../../shared/utils/validation";
import ShopSelect from "../../../shop/components/ShopSelect";
import UserSelect from "../../../users/components/UserSelect";
import RoleSelect from "../../../roles/components/RoleSelect";
import dayjs from "dayjs";
import { useEffect } from "react";

interface StaffProfileFormProps {
  initialValues?: StaffProfileDetail;
  loading?: boolean;
  onSubmit: (values: StaffProfileFormValues, form: FormInstance) => void;
  onCancel?: () => void;
}

const StaffProfileForm = ({
  initialValues,
  loading = false,
  onSubmit,
  onCancel,
}: StaffProfileFormProps) => {
  const [form] = Form.useForm<StaffProfileFormValues>();
  const handleCancel = () => {
    form.resetFields();
    onCancel?.();
  };
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        employeeCode: initialValues.employeeCode,
        shop: initialValues.shop,
        user: initialValues.user,
        role: initialValues.role,
        department: initialValues.department,
        designation: initialValues.designation,
        assignDate: dayjs(initialValues.assignDate),
        status: initialValues.status,
      });
    } else {
      form.setFieldsValue({ status: StaffStatus.Active });
    }
  }, [initialValues]);
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => onSubmit(values, form)}
    >
      <Form.Item
        name="employeeCode"
        label="Employee Code"
        rules={[
          { required: true, message: "Please enter employee code" },
          { whitespace: true, message: validator.BLANK_SPACE_MESSAGE },
        ]}
      >
        <Input placeholder="EMP-001" />
      </Form.Item>

      <Form.Item
        name="shop"
        label="Shop"
        rules={[{ required: true, message: "Please select shop" }]}
      >
        <ShopSelect />
      </Form.Item>

      <Form.Item
        name="user"
        label="User"
        rules={[{ required: true, message: "Please select user" }]}
      >
        <UserSelect />
      </Form.Item>

      <Form.Item
        name="role"
        label="Role"
        rules={[{ required: true, message: "Please select role" }]}
      >
        <RoleSelect />
      </Form.Item>

      <Form.Item
        name="department"
        label="Department"
        rules={[
          { required: true, message: "Please enter department" },
          { whitespace: true, message: validator.BLANK_SPACE_MESSAGE },
        ]}
      >
        <Input placeholder="Sales" />
      </Form.Item>

      <Form.Item
        name="designation"
        label="Designation"
        rules={[
          { required: true, message: "Please enter designation" },
          { whitespace: true, message: validator.BLANK_SPACE_MESSAGE },
        ]}
      >
        <Input placeholder="Sales Executive" />
      </Form.Item>

      <Form.Item
        name="assignDate"
        label="Assign Date"
        rules={[{ required: true, message: "Please select assign date" }]}
      >
        <DatePicker
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      {initialValues && (
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select
            options={[
              {
                value: StaffStatus.Active,
                label: "Active",
              },
              {
                value: StaffStatus.Inactive,
                label: "Inactive",
              },
              {
                value: StaffStatus.Suspended,
                label: "Suspended",
              },
            ]}
          />
        </Form.Item>
      )}

      <Form.Item>
        <Space>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default StaffProfileForm;
