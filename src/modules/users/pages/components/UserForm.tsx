import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { LockOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import * as validator from "../../../../shared/utils/validation";
import { useAuthStore } from "../../../auth/auth.store";
const userTypes = [
  {
    value: 1,
    label: "Staff",
  },
  {
    value: 2,
    label: "Customer",
  },
  {
    value: 3,
    label: "Vendor",
  },
];
type UserFormProps = {
  initialValues?: any;
  onFinish: (value: any, form: FormInstance) => void;
  loading?: boolean;
};

const UserForm = ({
  initialValues,
  onFinish,
  loading = false,
}: UserFormProps) => {
  const [form] = Form.useForm();
  const { user: authUser } = useAuthStore();

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Card title={initialValues ? "Edit User" : "Create User"}>
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => onFinish(values, form)}
        initialValues={{
          type: 2,
          isAdmin: false,
          isRevoked: false,
          ...initialValues,
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Enter first name" },
                { whitespace: true, message: validator.BLANK_SPACE_MESSAGE },
                {
                  pattern: /^\p{L}+(?:[ ']\p{L}+)*$/u,
                  message:
                    "First name can only contain letters, spaces, and apostrophes",
                },
              ]}
            >
              <Input placeholder="John" maxLength={50} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { whitespace: true, message: validator.BLANK_SPACE_MESSAGE },
                {
                  pattern: /^\p{L}+(?:[ ']\p{L}+)*$/u,
                  message:
                    "First name can only contain letters, spaces, and apostrophes",
                },
              ]}
            >
              <Input placeholder="Doe" maxLength={50} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Mobile"
              name="mobile"
              rules={[
                { required: true },
                {
                  pattern: /^\d+$/,
                  message: "Mobile number must contain only digits",
                },
                {
                  validator: (_, value) => {
                    if (!value || (value.length >= 10 && value.length <= 15)) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "Mobile number must be between 10 and 15 digits",
                      ),
                    );
                  },
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="017XXXXXXXX"
                disabled={initialValues && !authUser?.isAdmin}
                maxLength={15}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: "email", message: validator.VALID_EMAIL_MESSAGE },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="example@mail.com"
                maxLength={80}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="User Type"
              name="type"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select options={userTypes} placeholder="Select user type" />
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.type !== currentValues.type
              }
            >
              {({ getFieldValue, setFieldValue }) => {
                const isStaff = getFieldValue("type") === 1;

                if (!isStaff && getFieldValue("isAdmin")) {
                  setFieldValue("isAdmin", false);
                }

                return (
                  isStaff && (
                    <Form.Item valuePropName="checked" name="isAdmin" noStyle>
                      <Checkbox>Administrator</Checkbox>
                    </Form.Item>
                  )
                );
              }}
            </Form.Item>
          </Col>

          {!initialValues && (
            <Col xs={24} md={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Password cannot be empty" },
                  {
                    min: 6,
                    max: 50,
                    message: "Password must be between 6 and 50 characters",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  maxLength={50}
                />
              </Form.Item>
            </Col>
          )}
        </Row>

        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          <Button htmlType="button" onClick={onReset}>
            Cancel
          </Button>

          <Button loading={loading} type="primary" htmlType="submit">
            {initialValues ? "Update User" : "Create User"}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default UserForm;
