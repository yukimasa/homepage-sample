import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { microcmsClient } from "../libs/client";
import { Post } from "../types/post";

type DataType = {
  contents: Post[];
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ contents }) => {
  return (
    <div style={{ width: "1170px", margin: "100px auto" }}>
      <h2>投稿一覧</h2>
      <ul>
        {contents.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<DataType> = async () => {
  const data = await microcmsClient.get<DataType>({ endpoint: "posts" });

  return {
    props: {
      contents: data.contents,
    },
  };
};
