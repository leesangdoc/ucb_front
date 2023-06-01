import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";


// head는 여기서 Head 태그안에서 바꾼다.
function Home() {
  const router = useRouter();
  console.log("router111;;;", router);

  return (
    <div>
      <Head>
        <title>home-test</title>
        <meta name="description" content="My page description" />
      </Head>
      <div> Home </div>
      <Link
        legacyBehavior
        href={{
          pathname: "/TodoItem",
          // pathname: "/blog/[slug]", query: { slug: "my-post" },
        }}
      >
        <a>Blog Post</a>
      </Link><br/>
      <Link
        legacyBehavior
        href={{
          pathname: "/AxiosRecoilTest",
          query: { slug: "my-post" },
        }}
      >
        <a>react word cloud test</a>
      </Link>
      
    </div>
  );
}

export default Home;
