export interface IOrderItem {
  order_items_id: number;
  variant_id: {
    variant_id: number;
    product_id: number;
    color: string;
    size: string;
    product: {
      name: string;
      image_url: string;
    };
  };
  order_id: number;
  quantity: number;
  unit_price: number;
}
