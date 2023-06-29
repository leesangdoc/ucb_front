import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { useRouter, Router } from "next/router";
import { myQuery } from '@/app/recoil/selectors/selectors';
import { textState } from '@/app/recoil/atoms/atoms';
import { useRecoilValue, useRecoilState, useRecoilValueLoadable } from 'recoil';
import {Layout} from "@/components/Layout";
import { GetServerSideProps, NextPage } from 'next';
import Contents from '@/components/Contents';


interface boxOfficeResult {
  // boxofficeType: string;
  // showRange: string;
  // dailyBoxOfficeList: object;
  data: object;
}


// https://parkgang.github.io/blog/2021/05/06/using-recoil-in-nextjs/
//function AxiosRecoilTest({ Component, pageProps }: AppProps) {
const AxiosRecoilTest: NextPage<boxOfficeResult> =({ data }) => {
  const myQuery_ = useRecoilValueLoadable(myQuery);
  console.log('myQuery_;;;;;', myQuery_);
  const textState1 = useRecoilState(textState);
  console.log('textState1s;;;;;', textState1);
  console.log('serverSideProps;;;data;;;', data);
  useEffect(()=>{
  // recoil setting
  },[])
  // const pageProps = { name: 'Green', mark: 'hihi' };
  // const router: Router = useRouter(); // Router 인스턴스를 생성해야 함

  // const router = useRouter();
  /*
    const Component = SomeOtherComponent; // 다른 컴포넌트를 할당해야 함
  */
  switch (myQuery_.state) {
    case "hasValue":
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
      {/*
      <Contents {...pageProps} />
      */}
      </Layout>
    );
    case "loading":
      return <div>Loading...</div>;
    case "hasError":
      return <div>error...</div>;
  }
}

export const getServerSideProps: GetServerSideProps<boxOfficeResult> = async () => {
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
/*
  위의 예제에서 getServerSideProps 함수는 fetch를 사용하여 외부 API에서 데이터를 가져옵니다. 
  이 데이터는 props 객체의 속성으로 설정되고 MyPage 컴포넌트로 전달됩니다. 
  이후 MyPage 컴포넌트에서 data 속성을 사용하여 UI를 렌더링합니다.

  이 코드는 Next.js 프레임워크에서 사용되며, 서버 사이드 렌더링(SSR)을 지원하는 환경에서 실행됩니다. 
  클라이언트에서 해당 페이지로 요청이 들어올 때마다 서버에서 데이터를 가져와 페이지를 렌더링하므로 
  최초 로딩 시 서버에서 데이터를 가져와 초기 상태를 설정하는 데 사용됩니다.
*/




/**
 * 
const ItemList = ({ data }: IProps) => {
  return (
    <div>
      {data.map((data) => (
        <Link href={`/dynamic/${data.id}`} key={data.id}>
          <div key={data.id}>{data.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default ItemList;

import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import ItemList, { IItem } from "../component/itemList";

const Index = () => {
  // 임시 API URL
  const API_URL =
    "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";

  // 상태 생성
  const [list, setList] = useState<IItem[]>([]);

  // API 요청 후 상태에 저장
  const getData = () => {
    axios.get(API_URL).then((res) => {
      setList(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Head>
        <title>Next</title>
      </Head>
      <p>Hello Next.js</p>
      <ItemList data={list} />
    </div>
  );
};

export default Index;

 * 
 */

