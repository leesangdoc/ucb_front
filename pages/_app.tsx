import type { AppProps } from "next/app";
import GlobalStyle from "@/styles/globalStyle";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import React from "react";
/*
 them변수를 Provider에 할당하고
하위 컴포넌트에서
const ThemeTest = styled.div`
    color: ${props => props.theme.testColor};`; 형태로 사용한다.
*/
const them = {
  testColor: "#ff4c01",
};

function MyApp({ Component, pageProps }: AppProps) {
  console.log("MyApp;;;;;");
  return (
    <ThemeProvider theme={them} >
      <React.Suspense fallback={<div>Loading... </div>}>
        <RecoilRoot>
          <GlobalStyle />
          <Component {...pageProps} />
        </RecoilRoot>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default MyApp;
