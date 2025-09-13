"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Play, Pause, Volume2, VolumeX } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const revolutionSteps = [
  {
    id: 1,
    title: "Con đường cách mạng vô sản",
    subtitle: "Muốn cứu nước và giải phóng dân tộc",
    content: [
      "Từ thực tiễn phong trào yêu nước nổ ra và thất bại",
      "Khảo cứu cách mạng Pháp, Mỹ, đặc biệt là thắng lợi của Cách mạng Tháng Mười Nga năm 1917",
      "Năm 1920, khi đọc bản Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa của Lênin",
      "Kết luận: Độc lập dân tộc gắn liền với chủ nghĩa xã hội"
    ],
    quote: "Muốn cứu nước và giải phóng dân tộc không có con đường nào khác con đường cách mạng vô sản",
    image: "/images/giai-phong-dan-toc/cach-mang-vo-san.jpg",
    altText: "Hồ Chí Minh và con đường cách mạng",
    color: "from-red-800 to-red-600"
  },
  {
    id: 2,
    title: "Đảng Cộng sản lãnh đạo",
    subtitle: "Nhân tố chủ quan quyết định",
    content: [
      "Đảng Cộng sản là nhân tố chủ quan để giai cấp công nhân hoàn thành sứ mệnh lịch sử",
      "Giai cấp công nhân phải tổ chức ra chính đảng",
      "Đảng phải thuyết phục, giác ngộ và tập hợp đồng bào quần chúng",
      "Đảng là đội tiên phong của giai cấp công nhân và nhân dân lao động"
    ],
    quote: "Đảng của cả dân tộc Việt Nam",
    image: "/images/giai-phong-dan-toc/dang-cong-san-viet-nam-lanh-dao.jpg",
    altText: "Biểu tượng lãnh đạo của Đảng",
    color: "from-yellow-600 to-orange-500"
  },
  {
    id: 3,
    title: "Đại đoàn kết toàn dân tộc",
    subtitle: "Lấy liên minh công - nông làm nền tảng",
    content: [
      "Cách mạng là sự nghiệp của quần chúng nhân dân",
      "Quần chúng nhân dân là chủ thể sáng tạo ra lịch sử",
      "Có dân là có tất cả, trên đời này không gì quý bằng dân",
      "Công nông là 'chủ cách mệnh... là gốc cách mệnh'"
    ],
    quote: "Được lòng dân thì được tất cả, mất lòng dân thì mất tất cả",
    image: "/images/giai-phong-dan-toc/dai-doan-ket-dan-toc.jpg",
    altText: "Đại đoàn kết dân tộc",
    color: "from-green-700 to-green-500"
  },
  {
    id: 4,
    title: "Chủ động, sáng tạo",
    subtitle: "Giành thắng lợi trước cách mạng vô sản ở chính quốc",
    content: [
      "Luận điểm sáng tạo của Hồ Chí Minh, bổ sung vào Chủ nghĩa Mác – Lênin",
      "Thuộc địa có vị trí, vai trò đặc biệt đối với chủ nghĩa đế quốc",
      "Tinh thần đấu tranh cách mạng hết sức quyết liệt của các dân tộc thuộc địa",
      "Hình thành một 'lực lượng khổng lồ' khi được tập hợp và giác ngộ"
    ],
    quote: "Sáng tạo có giá trị lý luận và thực tiễn",
    image: "/images/giai-phong-dan-toc/ly-luan-sang-tao.jpg",
    altText: "Tư duy sáng tạo và chủ động",
    color: "from-blue-700 to-blue-500"
  },
  {
    id: 5,
    title: "Bạo lực cách mạng",
    subtitle: "Phương pháp đấu tranh cần thiết",
    content: [
      "Giải phóng dân tộc là một cuộc cách mạng bạo lực",
      "Sự thống trị thực dân, phát xít, đế quốc không có cơ sở cho đấu tranh phi bạo lực",
      "Giai cấp thống trị không bao giờ từ bỏ địa vị thống trị",
      "Bạo lực của quần chúng với hai lực lượng chính trị và quân sự"
    ],
    quote: "Dùng bạo lực cách mạng để chống lại bạo lực phản cách mạng",
    image: "/images/giai-phong-dan-toc/cach-mang-dau-tranh.jpg",
    altText: "Tinh thần đấu tranh cách mạng",
    color: "from-purple-700 to-purple-500"
  }
];

export default function CachMangGiaiPhongDanToc() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); 
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToSection = (index: number) => {
    setCurrentStep(index);
    const targetElement = document.querySelector(`.content-section-${index}`);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // SỬA LẠI HÀM HANDLE METADATA
  const handleVideoMetadata = () => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration;
      console.log('Video duration:', videoDuration); // Debug log
      if (videoDuration && !isNaN(videoDuration) && videoDuration > 0 && videoDuration !== Infinity) {
        setDuration(videoDuration);
      }
    }
  };

  // SỬA LẠI HÀM HANDLE LOADED DATA
  const handleLoadedData = () => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration;
      console.log('Video loaded data duration:', videoDuration); // Debug log
      if (videoDuration && !isNaN(videoDuration) && videoDuration > 0 && videoDuration !== Infinity) {
        setDuration(videoDuration);
      }
    }
  };

  // SỬA LẠI HÀM TUA VIDEO
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current && duration > 0) {
      const percentage = parseFloat(e.target.value);
      const newTime = (percentage / 100) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime); // Cập nhật currentTime ngay lập tức
    }
  };

  // FORMAT TIME - GIỮ NGUYÊN
  const formatTime = (time: number) => {
    if (isNaN(time) || time < 0) return "0:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".header-section", {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.out"
      });

      // Steps animation - HIỆU ỨNG ĐƠN GIẢN
      gsap.fromTo(".step-card", 
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".steps-container",
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
          }
        }
      );

      revolutionSteps.forEach((_, index) => {
        gsap.fromTo(`.content-section-${index}`, 
          {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: `.content-section-${index}`,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="fixed left-6 top-6 z-50 flex items-center gap-2 
                   bg-white/90 hover:bg-white text-red-800 font-semibold 
                   px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm
                   transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden md:inline">Trang chủ</span>
      </button>

      {/* Header Section */}
      <section className="header-section relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/giai-phong-dan-toc/cach-mang-giai-phong-dan-toc.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 
                         drop-shadow-2xl leading-tight">
            Cách mạng giải phóng dân tộc
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Tư tưởng Hồ Chí Minh về con đường giải phóng dân tộc Việt Nam
          </p>
          
          {/* Hero Video - ĐÃ SỬA LẠI */}
          <div className="relative max-w-5xl mx-auto mb-8 group">
            <video
              ref={videoRef}
              preload="metadata"
              className="w-full aspect-video rounded-lg shadow-2xl border-2 border-white/20 object-cover"
              poster="/images/giai-phong-dan-toc/tuyen-ngon-doc-lap.jpg"
              muted={isMuted}
              playsInline
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleVideoMetadata}
              onLoadedData={handleLoadedData} // THÊM EVENT HANDLER MỚI
              onDurationChange={handleVideoMetadata}
              onCanPlay={handleVideoMetadata} // THÊM EVENT HANDLER MỚI
              onError={() => console.log("Video load error")}
            >
              <source src="/videos/tuyen-ngon-doc-lap.mp4" type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>
            
            {/* Fallback image khi video không có */}
            <div className="absolute inset-0 bg-gray-800/80 rounded-lg flex items-center justify-center
                          opacity-0 transition-opacity duration-300"
                 style={{
                   opacity: videoRef.current?.error ? 1 : 0
                 }}>
              <div className="text-center text-white p-6">
                <Play className="w-20 h-20 mx-auto mb-4 opacity-70" />
                <p className="text-lg opacity-90 mb-2">Video</p>
                <p className="text-sm opacity-70">Cách mạng giải phóng dân tộc</p>
              </div>
            </div>
            
            {/* Nút Play/Pause ở giữa */}
            <div className="absolute inset-0 flex items-center justify-center 
                          bg-black/20 opacity-0 group-hover:opacity-100 
                          transition-opacity duration-300 rounded-lg">
              <button
                onClick={toggleVideo}
                className="bg-red-600/90 hover:bg-red-600 text-white p-5 rounded-full
                           transition-all duration-300 hover:scale-110 backdrop-blur-sm
                           shadow-lg"
                aria-label={isVideoPlaying ? "Pause video" : "Play video"}
              >
                {isVideoPlaying ? <Pause size={36} /> : <Play size={36} />}
              </button>
            </div>
            
            {/* CONTROLS CONTAINER - ĐÃ SỬA LẠI */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg p-4">
              
              {/* THANH PROGRESS BAR */}
              <div className="mb-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={duration > 0 ? (currentTime / duration) * 100 : 0}
                  onChange={handleProgressChange}
                  className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-4 
                           [&::-webkit-slider-thumb]:h-4 
                           [&::-webkit-slider-thumb]:rounded-full 
                           [&::-webkit-slider-thumb]:bg-red-600
                           [&::-webkit-slider-thumb]:cursor-pointer
                           [&::-webkit-slider-thumb]:shadow-lg
                           [&::-moz-range-thumb]:w-4 
                           [&::-moz-range-thumb]:h-4 
                           [&::-moz-range-thumb]:rounded-full 
                           [&::-moz-range-thumb]:bg-red-600
                           [&::-moz-range-thumb]:cursor-pointer
                           [&::-moz-range-thumb]:border-none
                           [&::-moz-range-thumb]:shadow-lg"
                />
              </div>

              {/* BOTTOM CONTROLS */}
              <div className="flex items-center justify-between">
                {/* TIME DISPLAY - SỬA LẠI */}
                <div className="text-white text-sm font-medium bg-black/30 px-2 py-1 rounded">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>

                {/* CONTROL BUTTONS */}
                <div className="flex items-center gap-3">
                  {/* Volume Button */}
                  <button
                    onClick={toggleMute}
                    className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full
                             transition-all duration-300"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Video title overlay */}
            <div className="absolute top-4 left-4 right-4">
              <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold text-lg">Tuyên ngôn độc lập</h3>
                <p className="text-sm opacity-90">2 tháng 9 năm 1945</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Overview */}
      <section className="steps-container py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Năm luận điểm cơ bản
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {revolutionSteps.map((step, index) => (
              <div
                key={step.id}
                className={`step-card cursor-pointer group relative overflow-hidden
                           bg-gradient-to-br ${step.color} text-white p-6 rounded-xl
                           shadow-lg hover:shadow-xl transition-all duration-300
                           hover:-translate-y-1 min-h-[200px] flex flex-col
                           ${currentStep === index ? 'ring-4 ring-white/50 scale-105' : ''}`}
                onClick={() => scrollToSection(index)}
              >
                <div className="relative z-10 flex-1 flex flex-col justify-center">
                  <div className="text-3xl font-bold mb-2 transition-transform duration-200">
                    {step.id}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm opacity-90">{step.subtitle}</p>
                </div>
                
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 
                               transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Content Sections */}
      {revolutionSteps.map((step, index) => (
        <section
          key={step.id}
          className={`content-section-${index} py-20 px-6 ${
            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
            }`}>
              {/* Content */}
              <div className={index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${step.color} 
                                   text-white rounded-full flex items-center justify-center
                                   text-xl font-bold`}>
                      {step.id}
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                        {step.title}
                      </h2>
                      <p className="text-gray-600">{step.subtitle}</p>
                    </div>
                  </div>

                  <blockquote className="relative border-l-4 border-red-600 pl-6 py-6 
                                       bg-gradient-to-r from-red-50 to-orange-50 
                                       rounded-r-lg shadow-md">
                    <div className="absolute top-2 left-2 text-red-300 text-4xl leading-none">"</div>
                    <p className="text-lg md:text-xl font-semibold text-gray-900 italic 
                                 leading-relaxed pl-6">
                      {step.quote}
                    </p>
                    <div className="absolute bottom-2 right-4 text-red-300 text-4xl leading-none 
                                   transform rotate-180">"</div>
                    <cite className="block text-right mt-4 text-red-700 font-medium text-sm">
                      — Chủ tịch Hồ Chí Minh
                    </cite>
                  </blockquote>

                  <ul className="space-y-4">
                    {step.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className={`w-2 h-2 bg-gradient-to-br ${step.color} 
                                       rounded-full mt-2 flex-shrink-0`} />
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Media */}
              <div className={index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}>
                <div className="relative group">
                  <div className="relative overflow-visible">
                    <div className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br ${step.color} 
                                   rounded-full opacity-20 blur-xl`} />
                    <div className={`absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br ${step.color} 
                                   rounded-full opacity-30 blur-lg`} />
                    
                    <div className="relative z-10 bg-white p-4 rounded-xl shadow-2xl 
                                   transform rotate-2 group-hover:rotate-0 transition-all duration-500
                                   group-hover:scale-105">
                      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
                        <Image
                          src={step.image}
                          alt={step.altText}
                          fill
                          className="object-cover transition-transform duration-500 
                                   group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                        />
                        
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                                       transition-opacity duration-300 flex items-center justify-center
                                       rounded-lg">
                          <div className="text-center text-white p-4">
                            <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                            <p className="text-sm">{step.altText}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-center">
                        <p className="text-gray-600 text-sm italic">{step.altText}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Conclusion Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-red-800 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ý nghĩa lịch sử
          </h2>
          <p className="text-xl leading-relaxed mb-8">
            Tư tưởng Hồ Chí Minh về cách mạng giải phóng dân tộc không chỉ có ý nghĩa 
            đối với Việt Nam mà còn đóng góp quan trọng vào kho tàng lý luận cách mạng 
            của nhân loại.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Sáng tạo lý luận</h3>
              <p>Bổ sung và phát triển chủ nghĩa Mác-Lênin phù hợp với điều kiện Việt Nam</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Thực tiễn thành công</h3>
              <p>Dẫn dắt cách mạng Việt Nam từ thắng lợi này đến thắng lợi khác</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Giá trị toàn cầu</h3>
              <p>Định hướng cho các dân tộc bị áp bức trên thế giới</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}