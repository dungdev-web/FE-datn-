import { ICategory } from "@/types/ICategory";


export const mockCategories: ICategory[] = [
  {
    categories_id: 1,
    name: "Thời trang nam",
    slug: "thoi-trang-nam",
    parent_id: null,
    image: null, // hoặc link ảnh
    status: 1,
    created_at: "2025-08-10T00:00:00Z",
    updated_at: "2025-08-10T00:00:00Z",
    children: [
      {
        categories_id: 2,
        name: "Áo sơ mi",
        slug: "ao-so-mi",
        parent_id: 1,
        image: null,
        status: 1,
        created_at: "2025-08-10T00:00:00Z",
        updated_at: "2025-08-10T00:00:00Z",
      },
      {
        categories_id: 3,
        name: "Quần jeans",
        slug: "quan-jeans",
        parent_id: 1,
        image: null,
        status: 1,
        created_at: "2025-08-10T00:00:00Z",
        updated_at: "2025-08-10T00:00:00Z",
      }
    ]
  },
  {
    categories_id: 4,
    name: "Thời trang nữ",
    slug: "thoi-trang-nu",
    parent_id: null,
    image: null,
    status: 1,
    created_at: "2025-08-10T00:00:00Z",
    updated_at: "2025-08-10T00:00:00Z",
    children: [
      {
        categories_id: 5,
        name: "Váy đầm",
        slug: "vay-dam",
        parent_id: 4,
        image: null,
        status: 1,
        created_at: "2025-08-10T00:00:00Z",
        updated_at: "2025-08-10T00:00:00Z",
      },
      {
        categories_id: 6,
        name: "Áo kiểu",
        slug: "ao-kieu",
        parent_id: 4,
        image: null,
        status: 1,
        created_at: "2025-08-10T00:00:00Z",
        updated_at: "2025-08-10T00:00:00Z",
      }
    ]
  }
];



export function getMockCategories(): ICategory[] {
  return mockCategories;
}
