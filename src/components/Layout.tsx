import {Header} from "@/components/Header";


export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div>
    {/* <Header children={undefined}/> */}
    <h3>헤더 밑에 레이아웃</h3>
    {children}
  </div>
);


