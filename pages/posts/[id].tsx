import type {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { Post } from "../../types/post";
import { microcmsClient } from "../../libs/client";
import { ParsedUrlQuery } from "querystring";

type Params = {
  contentId: string;
} & ParsedUrlQuery;

type DataType = { post: Post };

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PostId: NextPage<Props> = ({ post }) => {
  return (
    <main style={{ width: "1170px", margin: "100px auto" }}>
      <h2>{post.title}</h2>
      <p>{post.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${post.content}`,
        }}
      />
    </main>
  );
};

export default PostId;

// 静的生成のためのパスを指定
export const getStaticPaths: GetStaticPaths = async (): Promise<
  GetStaticPathsResult<Params>
> => {
  const data = await microcmsClient.get({ endpoint: "posts" });
  const paths = data.contents.map((content: Post) => {
    return {
      params: {
        id: content.id,
      },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<DataType, Params> = async ({
  params,
}) => {
  if (!params?.id) {
    throw new Error("Error: ID not found");
  }

  const data = await microcmsClient.get<Post>({
    endpoint: "posts",
    contentId: params.id as string | undefined,
  });

  return {
    props: { post: { ...data } },
  };
};
