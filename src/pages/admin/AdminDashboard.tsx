import { Card, Row, Col, Statistic } from "antd";

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Orders" value={1234} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Products" value={567} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Active Users" value={89} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
