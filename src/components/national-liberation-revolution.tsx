"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARD_PEEK_HEIGHT = 200;

export default function NationalLiberationRevolution() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !cardRef.current) return;

    const cardHeight = cardRef.current.offsetHeight;
    const initialY = cardHeight - CARD_PEEK_HEIGHT;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",

        end: `+=${cardHeight + window.innerHeight}`,
        scrub: 1,
        pin: true,
      },
    });

    timeline.fromTo(cardRef.current, { y: initialY }, { y: 0, ease: "none" });

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background-2.webp"
          alt="Hồ Chí Minh và nhân dân"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg uppercase">
          Vấn đề cách mạng giải phóng dân tộc
        </h1>
      </div>

      <div
        ref={cardRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 
             w-full md:w-[80%] lg:w-[70%] 
             bg-white/30 backdrop-blur-md border border-white/20 
             rounded-t-3xl shadow-2xl"
      >
        <div className="p-8">
          <div className="w-16 h-1.5 bg-white/50 rounded-full mx-auto mb-6"></div>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">
              Mục lục
            </h2>
            <ul className="space-y-8 text-lg md:text-xl text-gray-800">
              <li>
                <strong className="text-red-700">
                  1. Con đường cách mạng vô sản:
                </strong>{" "}
                Cách mạng giải phóng dân tộc muốn thắng lợi phải đi theo con
                đường cách mạng vô sản. Hồ Chí Minh khẳng định độc lập dân tộc
                gắn liền với chủ nghĩa xã hội.
              </li>
              <li>
                <strong className="text-red-700">
                  2. Sự lãnh đạo của Đảng Cộng sản:
                </strong>{" "}
                Cách mạng giải phóng dân tộc trong điều kiện Việt Nam muốn thắng
                lợi phải do Đảng Cộng sản lãnh đạo. Đảng là đội tiên phong của
                giai cấp công nhân và của cả dân tộc.
              </li>
              <li>
                <strong className="text-red-700">
                  3. Lực lượng đại đoàn kết toàn dân tộc:
                </strong>{" "}
                Cách mạng phải dựa trên sức mạnh của toàn dân tộc, lấy liên minh
                công – nông làm nền tảng. Hồ Chí Minh nhấn mạnh: “Có dân là có
                tất cả, mất dân là mất tất cả”.
              </li>
              <li>
                <strong className="text-red-700">
                  4. Tính chủ động, sáng tạo:
                </strong>{" "}
                Cách mạng giải phóng dân tộc phải chủ động, sáng tạo, có khả
                năng giành thắng lợi trước cách mạng vô sản ở chính quốc. Đây là
                một đóng góp quan trọng bổ sung cho Chủ nghĩa Mác – Lênin.
              </li>
              <li>
                <strong className="text-red-700">5. Bạo lực cách mạng:</strong>{" "}
                Giải phóng dân tộc là một cuộc cách mạng bạo lực. Hồ Chí Minh
                khẳng định cần dùng bạo lực cách mạng chống lại bạo lực phản
                cách mạng, kết hợp đấu tranh chính trị và đấu tranh vũ trang.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
