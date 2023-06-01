import { atom, Loadable, RecoilValue, RecoilValueReadOnly, selector, useRecoilValue, WrappedValue } from 'recoil';
import { textState } from "../atoms/atoms";
import axios from "axios";

export const charCountState = selector({
  key: "charCountState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);
    return text.length;
  },
});

export const myQuery = selector({
  key: 'myQuery',
  get: async ({get}) => {
    let _a:any;
    const _address = 'https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=20230527';
    await fetch(_address)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      _a = JSON.parse(JSON.stringify(myJson)).boxOfficeResult.dailyBoxOfficeList;
      return _a;
    });
    const result = _a;
    return result;

    //const response1 = await fetch(_address);
    //const response2 = await response1.json();
    //return JSON.parse(JSON.stringify(response2)).boxOfficeResult.dailyBoxOfficeList;

    // const res = await axios.get(_address);
    // const res2 = await res.data;
    // return JSON.parse(JSON.stringify(res2)).boxOfficeResult.dailyBoxOfficeList;

  },
});
// Support for Data Fetching
// 데이터를 가져오고 컴포넌트 내부에서 promise를 처리하는 강력하고 새로운 방법

/**
 * 
// app/page.js
async function getData() {
  const res = await fetch("https://api.example.com/...");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  return res.json();
}

// This is an async Server Component
export default async function Page() {
  const data = await getData();

  return <main>...</main>;
}


// next/image
Next.js 13은 강력한 새 이미지 구성 요소 를 도입하여 레이아웃 변경 없이 이미지를 쉽게 표시하고 성능 향상을 위해 필요에 따라 파일을 최적화할 수 있다고 한다.
더 적은 클라이언트 측 JavaScript 제공
더 쉬운 스타일 지정 및 구성
alt기본적으로 더 쉽게 액세스할 수 있는 필수 태그
웹 플랫폼과 일치
기본 지연 로딩에 수화가 필요하지 않기 때문에 더 빠름
import Image from "next/image";
import avatar from "./lee.png";
function Home() {
  // "alt" is now required for improved accessibility
  // optional: image files can be colocated inside the app/ directory
  return <Image alt="leeerob" src={avatar} placeholder="blur" />;
}
기존에는 width와 height를 지정해줘야 했지만 이제는 자동으로 제공해주는 것 같다.

조금 더 편리해지고 성능도 개선이 된 것 같다.
*/


