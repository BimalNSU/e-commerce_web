// import { ReactNode } from "react";
// import { Button, Layout, Menu } from "antd";
// import { Outlet, Link } from "react-router-dom";
// import { useAuthStore } from "../../modules/auth/auth.store";
// import { logoutApi } from "../../modules/auth/auth.api";

// const { Header, Content, Sider } = Layout;

// interface Props {
//   children?: ReactNode;
// }

// const AdminLayout = ({ children }: Props) => {
//   const handleLogout = async () => {
//     try {
//       await logoutApi();
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   const items = [
//     { key: "dashboard", label: <Link to="/admin/dashboard">Dashboard</Link> },
//     { key: "orders", label: <Link to="/admin/orders">Orders</Link> },
//     { key: "products", label: <Link to="/admin/products">Products</Link> },
//     { key: "logout", label: <Button onClick={handleLogout}>Logout</Button> },
//   ];
//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Sider theme="dark">
//         <div style={{ height: 64, color: "#fff", textAlign: "center" }}>
//           Admin Portal
//         </div>
//         <Menu theme="dark" mode="inline" items={items} />
//       </Sider>
//       <Layout>
//         <Header style={{ background: "#fff", padding: 0 }}>
//           Welcome Admin
//         </Header>
//         <Content style={{ margin: "16px" }}>{children || <Outlet />}</Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default AdminLayout;

// import React, { ReactNode, useState } from "react";
// import {
//   Layout,
//   Menu,
//   Breadcrumb,
//   Avatar,
//   Dropdown,
//   Badge,
//   Button,
// } from "antd";
// import Icon, {
//   DashboardOutlined,
//   UserOutlined,
//   ShoppingOutlined,
//   TeamOutlined,
//   SettingOutlined,
//   LogoutOutlined,
//   BellOutlined,
//   FileTextOutlined,
//   BarChartOutlined,
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
// } from "@ant-design/icons";
// import "./AdminLayout";
// import { Link } from "react-router-dom";
// import { logoutApi } from "../../modules/auth/auth.api";

// const { Header, Sider, Content } = Layout;

// interface Props {
//   children?: ReactNode;
// }
// const AdminLayout = ({ children }: Props) => {
//   const [collapsed, setCollapsed] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await logoutApi();
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   const userMenu = [
//     {
//       key: "profile",
//       label: (
//         <Link to="/admin/dashboard">
//           <UserOutlined />
//           Dashboard
//         </Link>
//       ),
//     },
//     {
//       key: "settings",
//       label: (
//         <Link to="/admin/settings">
//           <SettingOutlined />
//           Settings
//         </Link>
//       ),
//     },
//     { key: "logout", label: <Button onClick={handleLogout}>Logout</Button> },
//   ];
//   // const userMenu = (
//   //   <Menu>
//   //     <Menu.Item key="profile" icon={<UserOutlined />}>
//   //       Profile
//   //     </Menu.Item>
//   //     <Menu.Item key="settings" icon={<SettingOutlined />}>
//   //       Settings
//   //     </Menu.Item>
//   //     <Menu.Divider />
//   //     <Menu.Item key="logout" icon={<LogoutOutlined />}>
//   //       Logout
//   //     </Menu.Item>
//   //   </Menu>
//   // );
//   // const sliderMenu = [
//   //   {
//   //     key: "1",
//   //     label: (
//   //       <Link to="/admin/dashboard">
//   //         <DashboardOutlined>Dashboard</DashboardOutlined>
//   //       </Link>
//   //     ),
//   //   },
//   //   {
//   //     key: "2",
//   //     label: (
//   //       <Link to="/admin/dashboard">
//   //         <DashboardOutlined>Dashboard</DashboardOutlined>
//   //       </Link>
//   //     ),
//   //   },
//   // ]
//   return (
//     <Layout className="admin-layout">
//       <Sider
//         collapsible
//         collapsed={collapsed}
//         onCollapse={setCollapsed}
//         className="admin-sider"
//         width={260}
//       >
//         <div className="logo">
//           <h2>{collapsed ? "A" : "Admin Portal"}</h2>
//         </div>
//         <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
//           <Menu.Item key="1" icon={<DashboardOutlined />}>
//             Dashboard
//           </Menu.Item>
//           <Menu.Item key="2" icon={<UserOutlined />}>
//             Users Management
//           </Menu.Item>
//           <Menu.Item key="3" icon={<TeamOutlined />}>
//             Staff Management
//           </Menu.Item>
//           <Menu.Item key="4" icon={<ShoppingOutlined />}>
//             Orders
//           </Menu.Item>
//           <Menu.Item key="5" icon={<BarChartOutlined />}>
//             Analytics
//           </Menu.Item>
//           <Menu.Item key="6" icon={<FileTextOutlined />}>
//             Reports
//           </Menu.Item>
//           <Menu.Item key="7" icon={<SettingOutlined />}>
//             Settings
//           </Menu.Item>
//         </Menu>
//       </Sider>
//       <Layout>
//         <Header className="admin-header">
//           <div className="header-left">
//             <Button
//               type="text"
//               icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//               onClick={() => setCollapsed(!collapsed)}
//             />
//             <Breadcrumb className="breadcrumb">
//               <Breadcrumb.Item>Home</Breadcrumb.Item>
//               <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
//             </Breadcrumb>
//           </div>
//           <div className="header-right">
//             <Badge count={5} className="notification-badge">
//               <BellOutlined style={{ fontSize: 20 }} />
//             </Badge>
//             <Dropdown menu={{ items: userMenu }} placement="bottomRight">
//               <div className="user-info">
//                 <Avatar icon={<UserOutlined />} />
//                 <span>Admin User</span>
//               </div>
//             </Dropdown>
//           </div>
//         </Header>
//         <Content className="admin-content">{children}</Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default AdminLayout;

import { Children, ReactNode } from "react";

import {
  DashboardOutlined,
  UserOutlined,
  ShoppingOutlined,
  TeamOutlined,
  SettingOutlined,
  FileTextOutlined,
  BarChartOutlined,
  ShopOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import OfficeLayout from "../app/layouts/officeLayout";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const sliderMenu = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: <Link to="/admin/dashboard">Dashboard</Link>,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Users Management",
      children: [
        {
          key: "2.1",
          label: <Link to="/admin/users/add">Add User</Link>,
        },
        { key: "2.2", label: <Link to="/admin/users">User List</Link> },
      ],
    },
    {
      key: "3",
      icon: <TeamOutlined />,
      label: "Staff Management",
      children: [
        {
          key: "3.1",
          label: <Link to="/admin/staff-profiles/add">Add Staff</Link>,
        },
        {
          key: "3.2",
          label: <Link to="/admin/staff-profiles">Staff List</Link>,
        },
      ],
    },
    {
      key: "4",
      icon: <ShopOutlined />,
      label: "Shops",
      children: [
        {
          key: "4.1",
          label: <Link to="/admin/shops/add">Add Shop</Link>,
        },
        {
          key: "4.2",
          label: <Link to="/admin/shops">Shop List</Link>,
        },
      ],
    },
    {
      key: "5",
      icon: <ShoppingOutlined />,
      label: <Link to="/admin/orders">Orders</Link>,
    },
    {
      key: "6",
      icon: <BarChartOutlined />,
      label: <Link to="/admin/analytics">Analytics</Link>,
    },
    {
      key: "7",
      icon: <FileTextOutlined />,
      label: <Link to="/admin/reports">Reports</Link>,
    },
    {
      key: "8",
      icon: <SettingOutlined />,
      label: <Link to="/admin/settings">Settings</Link>,
    },
  ];
  return (
    <OfficeLayout sliderMenu={sliderMenu}>
      <Outlet />
    </OfficeLayout>
  );
};

export default AdminLayout;
