// mocks/mockCart.ts
import { IBlog } from "@/types/blog";
const defaultBlog: IBlog[] = [
  {
    post_id: 1,
    title: "Ngày mai lên hương",
    slug: "ngay-mai-len-huong",
    content: "ccccccccccccccccccccccccccccccccccccccccccc",
    thumbnail: "hy.jpg",
    images: null,
    status: 1,
    category_post_id: 5,
    author_id: 5,
    created_at: "2025-07-11T11:05:42.000Z",
    updated_at: "2025-07-11T11:34:09.000Z",
    category_post: {
      category_post_id: 5,
      name: "Tin tức",
      slug: "tin-tuc",
      parent_id: null
    },
    author: {
      user_id: 5,
      name: "Trúc Tấn",
      avatar: "https://lh3.googleusercontent.com/a/ACg8ocKgTz_4SH_nMwjYLQbMh0U7zOdJiIYT1RW9JYEA1iAF91wbCXo=s96-c"
    }
  },
  {
    post_id: 3,
    title: "Ngày mai lên hương nè",
    slug: "ngay-mai-len-huong-ne",
    content: "cccccccccccccccccccccccccccccccccccccccccccddsdw",
    thumbnail: "hy.jpg",
    images: null,
    status: 1,
    category_post_id: 6,
    author_id: 6,
    created_at: "2025-07-11T11:05:42.000Z",
    updated_at: "2025-07-11T11:34:09.000Z",
    category_post: {
      category_post_id: 6,
      name: "Khuyến mãi",
      slug: "khuyen-mai",
      parent_id: null
    },
    author: {
      user_id: 6,
      name: "Đức Dũng Lưu",
      avatar: "https://lh3.googleusercontent.com/a/ACg8ocLu6IF7nwDewBVIIRNz6lF0AFsBPQP5gNEn4w_ax8lec4Uv3A=s96-c"
    }
  }
];

export const getMockBlog = (): IBlog[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("mockBlog");
    return stored ? JSON.parse(stored) : defaultBlog;
  }
  return defaultBlog;
};

export const saveMockBlog = (blog: IBlog[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("mockBlog", JSON.stringify(blog));
  }
};
