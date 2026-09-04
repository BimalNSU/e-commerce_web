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

import React, { ReactNode, useState } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Avatar,
  Dropdown,
  Badge,
  Button,
  Space,
  Popover,
  theme,
  ConfigProvider,
  MenuProps,
  Typography,
} from "antd";

import {
  DashboardOutlined,
  UserOutlined,
  ShoppingOutlined,
  TeamOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  FileTextOutlined,
  BarChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import styles from "./officeLayout.module.css";
import { logoutApi } from "../../modules/auth/auth.api";
import { useAuthStore } from "../../modules/auth/auth.store";
import { useSettingsStore } from "../../settings/useSettingsStore";
import ThemeButton from "../../settings/components/themeButton";
type MenuItem = Required<MenuProps>["items"][number];
const { Title } = Typography;
const { Header, Sider, Content, Footer } = Layout;
interface Props {
  sliderMenu: MenuItem[];
  children?: ReactNode;
}
const OfficeLayout = ({ sliderMenu, children }: Props) => {
  const themeMode = useSettingsStore((s) => s.theme);
  const [collapsed, setCollapsed] = useState(false);
  const { user, clearAuth } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logoutApi();
      clearAuth();
    } catch (e) {
      console.log(e);
    }
  };
  const userMenu: MenuProps = {
    items: [
      {
        key: "profile",
        icon: <UserOutlined />,
        label: "Profile",
      },
      {
        key: "settings",
        icon: <SettingOutlined />,
        label: "Settings",
      },
      {
        type: "divider",
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        danger: true,
        onClick: handleLogout,
        label: "Logout",
      },
    ],
  };

  return (
    <Layout
      className={`${styles.officeLayout} ${
        themeMode === "dark" ? styles.themeDark : styles.themeLight
      }`}
    >
      {/* SIDEBAR */}
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={270}
        className={styles.officeSider}
      >
        <div className={styles.logo}>
          <Title level={4}>
            {user?.isAdmin
              ? collapsed
                ? "AP"
                : "Admin Portal"
              : collapsed
              ? "SP"
              : "Staff Portal"}
          </Title>
        </div>

        <Menu
          // theme={themeMode}
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={sliderMenu}
          className={styles.sidebarMenu}
        />
      </Sider>

      <Layout className={styles.mainLayout}>
        {/* TOPBAR */}
        <Header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className={styles.collapseBtn}
            />
          </div>

          <div className={styles.topbarRight}>
            <Badge count={5}>
              <Button
                type="text"
                shape="circle"
                icon={<BellOutlined />}
                // className={styles.iconBtn}
              />
            </Badge>
            <ThemeButton />
            <Dropdown menu={userMenu} placement="bottomRight">
              <div className={styles.userProfile}>
                <Avatar icon={<UserOutlined />} />
                <span>{user?.firstName}</span>
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* CONTENT */}
        <Content className={styles.officeContent}>
          <div className={styles.contentWrapper}>{children}</div>
        </Content>
        <Footer className={styles.footer}>
          <span>
            © {new Date().getFullYear()} Organic Design. All rights reserved.
          </span>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default OfficeLayout;
