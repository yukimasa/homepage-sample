import { MicroCMSListContent } from "microcms-js-sdk";

export type Post = {
  title: string;
  content: string;
} & MicroCMSListContent;
