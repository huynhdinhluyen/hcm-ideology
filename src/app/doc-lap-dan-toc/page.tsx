"use client";

import IndependenceIssues from "@/components/independence-issues-step";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const DocLapDanToc = () => {
  const router = useRouter();
  return (
    <div>
      <IndependenceIssues />
      <button
        onClick={() => router.push("/")}
        className="fixed left-6 bottom-2 z-50 
                   flex items-center gap-2 
                  text-white font-bold bg-transparent
                   px-4 py-2 rounded-lg shadow-md 
                   transition-transform duration-300 hover:scale-105 cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" />
        Quay lại
      </button>
    </div>
  );
};

export default DocLapDanToc;
