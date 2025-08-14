import { API_BASE_URL } from "@/config/env";
import { District, Province, Ward } from "@/types/Country";

export async function getProvinces(): Promise<Province[]> {
  const res = await fetch(`${API_BASE_URL}/province/provinces`);
  if (!res.ok) throw new Error("Lỗi khi lấy tỉnh/thành");
  return res.json();
}

export async function getDistricts(provinceCode: string | number): Promise<District[]> {
  const res = await fetch(`${API_BASE_URL}/province/provinces/${provinceCode}/districts`);
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Lỗi API lấy quận/huyện:", res.status, errorText);
    throw new Error("Lỗi khi lấy quận/huyện");
  }
  return res.json();
}

export async function getWards(districtCode: string | number): Promise<Ward[]> {
  const res = await fetch(`${API_BASE_URL}/province/districts/${districtCode}/wards`);
  if (!res.ok) throw new Error("Lỗi khi lấy xã/phường");
  return res.json();
}
