// pages/api/og.jsx
/**
OG Image Generation
OG(OpenGraph) Image는 마케팅적으로 많이 사용되고 사용자들의 클릭 참여율을 크게 높힌다.

하지만 이걸 수동으로 작업하면 관리 차원에서 조금 힘든 부분이 있는데 이 점을 보완하기 위해서

Next.js와 원활하게 작동하는 새로운 라이브러리를 만들었다고 한다. [@vercel/og](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation)
*/
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge", // "experimental-edge", 
};

export default function () {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
        }}
      >
        Hello, World!
      </div>
    )
  );
}

