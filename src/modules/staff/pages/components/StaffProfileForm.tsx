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
import { ShopSelect } from "../../../shop/components/ShopSelect";
import { UserSelect } from "../../../users/components/UserSelect";
import { RoleSelect } from "../../../roles/components/RoleSelect";
import dayjs from "dayjs";

interface StaffProfileFormProps {
  initialValues?: StaffProfileDetail;
  loading?: boolean;
  onSubmit: (values: StaffProfileFormValues, form: FormInstance) => void;
  onCancel?: () => void;
}

export function StaffProfileForm({
  initialValues,
  loading = false,
  onSubmit,
  onCancel,
}: StaffProfileFormProps) {
  const [form] = Form.useForm<StaffProfileFormValues>();
  const handleCancel = () => {
    form.resetFields();
    onCancel?.();
  };
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        status: StaffStatus.Active,
        ...(initialValues && {
          employeeCode: initialValues.employeeCode,
          shopId: initialValues.shop.id,
          userId: initialValues.user.id,
          roleId: initialValues.role.id,
          department: initialValues.department,
          designation: initialValues.designation,
          assignDate: dayjs(initialValues.assignDate),
          status: initialValues.status,
        }),
      }}
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
        <ShopSelect initialOption={initialValues?.shop} />
      </Form.Item>

      <Form.Item
        name="user"
        label="User"
        rules={[{ required: true, message: "Please select user" }]}
      >
        <UserSelect initialOption={initialValues?.user} />
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
}
