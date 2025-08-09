import { IBrand } from "@/types/IBrand";

export const mockBrands: IBrand[] = [
  {
    brand_id: 1,
    name: "Nike",
    slug: "nike",
    logo_url: "https://example.com/logos/nike.png",
    status:1,
    created_at:"09-09-2025",
    updated_at:"09-09-2025"
  },
  {
    brand_id: 2,
    name: "Adidas",
    slug: "adidas",
    logo_url: "https://example.com/logos/adidas.png",
        status:1,
    created_at:"09-09-2025",
    updated_at:"09-09-2025"

  },
  {
    brand_id: 3,
    name: "Puma",
    slug: "puma",
    logo_url: "https://example.com/logos/puma.png",
        status:1,
    created_at:"09-09-2025",
    updated_at:"09-09-2025"

  },
  {
    brand_id: 4,
    name: "New Balance",
    slug: "new-balance",
    logo_url: "https://example.com/logos/new_balance.png",
        status:1,
    created_at:"09-09-2025",
    updated_at:"09-09-2025"

  },
  {
    brand_id: 5,
    name: "Converse",
    slug: "converse",
    logo_url: "https://example.com/logos/converse.png",
        status:1,
    created_at:"09-09-2025",
    updated_at:"09-09-2025"

  },
  {
    brand_id: 6,
    name: "Vans",
    slug: "vans",
    logo_url: "https://example.com/logos/vans.png",
        status:1,
    created_at:"09-09-2025",
    updated_at:"09-09-2025"

  },
];

export function getMockBrands(): IBrand[] {
  return mockBrands;
}
