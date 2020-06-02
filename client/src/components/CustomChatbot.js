import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

function CustomChatbot(props) {
  const config = {
    width: "400px",
    height: "500px",
    floating: true,
    floatingStyle: {
      left: "20px",
      right: "initial",
      transformOrigin: "bottom left",
    },
  };

  const theme = {
    background: "white",
    fontFamily: "Arial, Helvetica, sans-serif",
    headerBgColor: "#00B2B2",
    headerFontColor: "#fff",
    headerFontSize: "25px",
    botBubbleColor: "#00B2B2",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4c4c4c",
  };

  const steps = [
    {
      id: "Greet",
      message: "Hello, Welcome to our shop",
      trigger: "Done",
    },
    {
      id: "Done",
      message: "Have a great day !!",
      end: true,
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} {...config} />
    </ThemeProvider>
  );
}
export default CustomChatbot;
