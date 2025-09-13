'use client'

import NationalLiberationRevolution from "@/components/national-liberation-revolution";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CachMangGiaiPhongDanToc = () => {
  const router = useRouter();
  return (
    <div>
      <NationalLiberationRevolution />
      <button
        onClick={() => router.push("/")}
        className="fixed left-6 top-2 z-50 
                         flex items-center gap-2 
                        text-white font-bold bg-transparent
                         px-4 py-2 rounded-lg 
                         transition-transform duration-300 hover:scale-105 cursor-pointer hover:underline"
      >
        <ArrowLeft className="w-5 h-5" />
        Quay lại
      </button>
    </div>
  );
};

export default CachMangGiaiPhongDanToc;
