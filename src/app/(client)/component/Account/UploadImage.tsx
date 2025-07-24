// components/UserProfileHeader.tsx
"use client";

import { IUser } from "@/types/user";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  user: IUser;
  setUser: (user: IUser) => void;
  uploadAvatarService: (id: number, file: File) => Promise<IUser>;
  API_BASE_URL: string;
}

export default function UploadImageProfile({
  user,
  setUser,
  uploadAvatarService,
  API_BASE_URL,
}: Props) {
  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        try {
          const updatedUser = await uploadAvatarService(
            user.id,
            target.files[0]
          );
          setUser(updatedUser);
          toast.success("Upload thành công");
        } catch (error: any) {
          console.error("Upload avatar error:", error);
          toast.error(error.message);
        }
      }
    };
    input.click();
  };

  return (
    <div
      className="flex items-center justify-between !p-[20px] !mb-[20px] rounded-[8px] border border-[#e9ecef]"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="flex items-center">
        <img
          src={
            user.picture
              ? user.picture
              : user.avatar
              ? `${API_BASE_URL}/uploads/${user.avatar}?t=${Date.now()}`
              : "/images/default.png"
          }
          alt="Avatar"
          className="w-[80px] h-[80px] rounded-full object-cover !mr-[20px] border-[3px] border-[#007bff] shadow-md"
        />

        <div>
          <h3 className="text-[16px] text-[#333] !mb-[5px]">{user.name}</h3>
          <p className="text-[14px] text-[#666] !m-0">{user.email}</p>
        </div>
      </div>

      <button
        onClick={handleUpload}
        className="flex items-center gap-1 !px-4 !py-2 text-white rounded-[5px] text-[14px] font-medium transition duration-200"
        style={{ backgroundColor: "#007bff" }}
        onMouseOver={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#0056b3")
        }
        onMouseOut={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#007bff")
        }
      >
        <i className="fa-solid fa-camera"></i> Đổi ảnh
      </button>
    </div>
  );
}
