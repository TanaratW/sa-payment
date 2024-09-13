import {
  Layout,
  Button,
  Input,
  Card,
  Divider,
  Row,
  Col,
  ConfigProvider,
} from "antd";
import { useState } from "react";
import HeaderComponent from "../../components/Header";
import { CreditCardOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";
import PromptPayIcon from "../../components/PromptPayIcon";
import PromptPayQRCode from "../../components/PromptPayQRCode";

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: linear-gradient(
          135deg,
          rgba(2, 0, 36, 1) 0%,
          rgba(211, 172, 43, 1) 100%
        );
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s ;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
        );
      }
    }
  `,
}));

const { Header, Content } = Layout;

function Payment() {
  const { styles } = useStyle();

  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const handleMethodChange = (method: string) => {
    setPaymentMethod(method);
  };
  return (
    <ConfigProvider
      button={{ className: styles.linearGradientButton }}
      theme={{
        components: {
          Card: {
            headerFontSize: 40,
            colorText: "#002A48",
          },
          Button: {
            defaultHoverColor: "black",
            defaultActiveBorderColor: "#D3AC2B",
          },
        },
      }}
    >
      <Layout style={{ height: "100vh" }}>
        <Header style={{ backgroundColor: "white" }}>
          <HeaderComponent />
        </Header>

        <Content style={{ backgroundColor: "white" }}>
          <Row gutter={32}>
            {/* Left Section: Payment Form */}
            <Col span={14}>
              <Card
                type="inner"
                title="Checkout"
                bordered={true}
                style={{ textAlign: "start" }}
              >
                <h2>Payment method</h2>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "20px",
                    flexDirection: "row",
                  }}
                >
                  <Button
                    icon={<CreditCardOutlined style={{ fontSize: "24px" }} />}
                    size="large"
                    style={{
                      backgroundColor: "white",
                      borderColor: "rgba(0, 0, 0, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      width: "250px",
                      height: "50px",
                      fontWeight: "630",
                    }}
                    onClick={() => handleMethodChange("card")}
                  >
                    <div style={{ fontSize: "16px" }}>Credit/Debit Card</div>
                  </Button>
                  <Button
                    size="large"
                    style={{
                      backgroundColor: "white",
                      borderColor: "rgba(0, 0, 0, 0.3)",
                      width: "250px",
                      height: "50px",
                    }}
                    onClick={() => handleMethodChange("promptpay")}
                  >
                    <PromptPayIcon />
                  </Button>
                </div>

                {paymentMethod === "card" && (
                  <div>
                    <h3>Card Information</h3>
                    <Input
                      placeholder="1234 1234 1234 1234"
                      size="large"
                      style={{ marginBottom: "10px" }}
                    />
                    <Row gutter={8} style={{ marginBottom: "10px" }}>
                      <Col span={12}>
                        <Input placeholder="MM / YY" size="large" />
                      </Col>
                      <Col span={12}>
                        <Input placeholder="CVC" size="large" />
                      </Col>
                    </Row>
                    <Input
                      placeholder="Name on card"
                      size="large"
                      style={{ marginBottom: "20px" }}
                    />
                  </div>
                )}

                {paymentMethod === "promptpay" && (
                  <div>
                    <h3>Generate PromptPay QR Code</h3>
                    <PromptPayQRCode mobileNumber="0631456442" amount={1.0} />
                  </div>
                )}

                <h3>Order details</h3>
                <Card
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      height: "100%",
                      width: "635px",
                      flexDirection: "row",
                    }}
                  >
                    <span style={{ flexGrow: 1 }}>Course name</span>
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      THB 0,000.00
                    </span>
                  </div>
                </Card>
              </Card>
            </Col>

            <Col span={10}>
              <Card
                type="inner"
                title="Summary"
                bordered={true}
                style={{ textAlign: "start" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <span>Original Price:</span>
                  <span>THB 0,000.00</span>
                </div>
                <Divider />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                    fontSize: "18px",
                    marginBottom: "20px",
                  }}
                >
                  <span>Total:</span>
                  <span>THB 0,000.00</span>
                </div>
                <Button
                  type="primary"
                  size="large"
                  style={{
                    width: "100%",
                    fontWeight: "bold",
                    backgroundColor: "rgba(211,172,43,0.85)",
                  }}
                >
                  Complete Checkout
                </Button>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default Payment;
