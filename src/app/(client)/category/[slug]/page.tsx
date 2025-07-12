 "use client";
import { getProductsByCategorySlug } from "@/services/brandService";
import { getCategories } from "@/services/categoryService";
import Image from "next/image";

interface Params {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = params;
  const products = await getProductsByCategorySlug(slug);
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">
        {category ? category.name : "Danh mục không xác định"}
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => {
            const image = product.images?.[0];
            return (
              <a
                key={product.products_id}
                href={`/client/product/${product.slug}/detail`}
                className="block border border-gray-200 rounded hover:shadow-lg transition"
              >
                <div className="w-full h-48 bg-gray-100 relative">
                  {image?.url ? (
                    <Image
                      src={image.url}
                      alt={image.alt_text || product.name}
                      fill
                      className="object-cover rounded-t"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      Không có ảnh
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-semibold">{product.name}</h3>
                  <p className="text-red-500 font-bold">
                    {Number(product.sale_price).toLocaleString()}₫
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">Không tìm thấy sản phẩm nào.</p>
      )}
    </div>
  );
}
