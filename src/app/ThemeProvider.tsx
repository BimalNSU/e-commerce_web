import { PropsWithChildren } from "react";
import { ConfigProvider, theme } from "antd";
import { useSettingsStore } from "../settings/useSettingsStore";

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const mode = useSettingsStore((s) => s.theme);
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();
  return (
    <ConfigProvider
      // theme={{
      //   token: {
      //     colorPrimary: "#1677ff",
      //     borderRadius: 6,
      //   },
      // }}
      theme={{
        algorithm:
          mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
