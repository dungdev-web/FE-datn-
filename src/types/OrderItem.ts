export interface IOrderItem {
  order_items_id: number;
  variant: {
    variant_id: number;
    product_id: number;
    color: {
      id: number;
      name_color: string;
    };
    product: {
      name: string;
      image_url: string;
    };
    size: {
      id: number;
      number_size: string;
    };
  };
  order_id: number;
  quantity: number;
  unit_price: number;
}
