export interface ICoupon{
    coupons_id:number;
    code:string;
    discount_type:string;
    start_date:Date;
    end_date:Date;
    usage_limit:number;
    used_count:number;
}