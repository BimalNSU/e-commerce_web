import { Button } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useSettingsStore } from "../useSettingsStore";
import styles from "../../app/layouts/officeLayout.module.css";

const ThemeButton = () => {
  const { theme, toggleTheme } = useSettingsStore();
  return (
    <Button
      type="text"
      shape="circle"
      icon={theme === "dark" ? <SunOutlined /> : <MoonOutlined />}
      className={styles.iconBtn}
      onClick={toggleTheme}
    />
  );
};
export default ThemeButton;
