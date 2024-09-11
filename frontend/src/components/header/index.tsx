import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Menu, Space, ConfigProvider, Avatar } from "antd";
import type { MenuProps } from "antd";
import {
  BookOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Logo from "../../assets/Logo_Course.png";

const { Header } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "ซื้อคอร์ส",
    key: "course",
    icon: <ShoppingCartOutlined />,
  },
  {
    label: "คอร์สของฉัน",
    key: "myCourse",
    icon: <BookOutlined />,
  },
];

function HeaderComponent() {
  const location = useLocation();
  const [current, setCurrent] = useState<string>(() => {
    return location.pathname === "/myCourses" ? "myCourse" : "course";
  });

  useEffect(() => {
    setCurrent(location.pathname === "/myCourses" ? "myCourse" : "course");
  }, [location]);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#333d51",
        justifyContent: "space-between",
        width: "100%",
        height: "65px",
        position: "fixed",
        padding: "0px 20px",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <Space>
        <div style={{ marginTop: "26px" }}>
          <img
            style={{ height: "65px", width: "65px" }}
            src={Logo}
            alt="BrainBoom_Logo"
          />
        </div>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemColor: "white",
                iconSize: 18,
                itemHoverColor: "#D3AC2B",
                colorPrimary: "#D3AC2B",
              },
            },
          }}
        >
          <Menu
            style={{ backgroundColor: "#333d51" }}
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
        </ConfigProvider>
      </Space>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          width: "150px",
          maxWidth: "100px",
          gap: "20px",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            color: "white",
          }}
        >
          Macc
        </div>
        <Avatar size={45} icon={<UserOutlined />} />
      </div>
    </Header>
  );
}

export default HeaderComponent;
