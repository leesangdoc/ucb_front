import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { useRouter, Router } from "next/router";
import { myQuery } from '@/app/recoil/selectors/selectors';
import { textState } from '@/app/recoil/atoms/atoms';
import { useRecoilValue, useRecoilState, useRecoilValueLoadable } from 'recoil';
import {Layout} from "@/components/Layout";
import { GetServerSideProps, NextPage } from 'next';
import Contents, { ContentsProps } from '@/components/Contents';

interface boxOfficeResult {
  // boxofficeType: string;
  // showRange: string;
  // dailyBoxOfficeList: object;
  data: object;
}

interface AxiosRecoilTestProps {
  data: boxOfficeResult;
}


// https://parkgang.github.io/blog/2021/05/06/using-recoil-in-nextjs/
function AxiosRecoilTest({ Component, pageProps }: AppProps) {
// const AxiosRecoilTest: NextPage<AxiosRecoilTestProps> =({ data }) => {
//const AxiosRecoilTest: NextPage<AxiosRecoilTestProps> =({ data }) => {
  const myQuery_ = useRecoilValueLoadable(myQuery);
  console.log('myQuery_;;;;;', myQuery_);
  const textState1 = useRecoilState(textState);
  console.log('textState1s;;;;;', textState1);

  useEffect(()=>{
  // recoil setting
  },[])
  // const pageProps = { name: 'Green', mark: 'hihi' };
  // const router: Router = useRouter(); // Router 인스턴스를 생성해야 함

  // const router = useRouter();
  const contentsProps: ContentsProps = {
    name: "Green"
    , mark: "hihi"
    //router: useRouter(),
  };

  switch (myQuery_.state) {
    case "hasValue":
    // 추가적인 props
    

    return (
      <Layout>
        <h1>AxiosRecoilTest</h1>
        <h1>영화 리스트 목록(리코일 방식 데이터 뿌리기)</h1>
        <br/>

        {
          myQuery_.contents.map((val: any, index: any)=>{
              // console.log('val;;;', val);
              return <div key={val.rank}>{val.rank}, {val.movieNm}, {val.openDt}, {val.showCnt}</div>
          })
        }
      

      
      <Contents {...pageProps}{...contentsProps} />
      


      </Layout>
    );
    case "loading":
      return <div>Loading...</div>;
    case "hasError":
      return <div>error...</div>;
  }
}

export const getServerSideProps: GetServerSideProps<AxiosRecoilTestProps> = async () => {
  // 서버 측에서 데이터를 가져와 props로 전달합니다.
  const res = await fetch('https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=20230527');
  const data = await res.json();
  console.log('serverside;;;', data)
  return {
    props: {
      data,
    },
  };
}


export default AxiosRecoilTest;

