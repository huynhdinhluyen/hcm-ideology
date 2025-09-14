"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Play, Pause, Volume2, VolumeX, ChevronUp } from "lucide-react";
import Header from "@/components/header"; // THÊM IMPORT

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
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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

  const handleVideoMetadata = () => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration;
      if (videoDuration && !isNaN(videoDuration) && videoDuration > 0 && videoDuration !== Infinity) {
        setDuration(videoDuration);
      }
    }
  };

  const handleLoadedData = () => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration;
      if (videoDuration && !isNaN(videoDuration) && videoDuration > 0 && videoDuration !== Infinity) {
        setDuration(videoDuration);
      }
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current && duration > 0) {
      const percentage = parseFloat(e.target.value);
      const newTime = (percentage / 100) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

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

      // Steps animation
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
      {/* THÊM HEADER COMPONENT */}
      <Header />
      
      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="fixed left-2 top-20 sm:left-6 sm:top-24 z-40 flex items-center gap-1 sm:gap-2 
                   bg-white/90 hover:bg-white text-red-800 font-semibold 
                   px-2 py-2 sm:px-4 sm:py-2 rounded-lg shadow-lg backdrop-blur-sm
                   transition-all duration-300 hover:scale-105 cursor-pointer
                   text-xs sm:text-sm"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Trang chủ</span>
      </button>

      {/* SCROLL TO TOP BUTTON */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-2 bottom-2 sm:right-6 sm:bottom-6 z-50 
                     bg-red-600 hover:bg-red-700 text-white p-2 sm:p-3 rounded-full
                     shadow-lg transition-all duration-300 hover:scale-110
                     animate-bounce"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Header Section - ĐIỀU CHỈNH ĐỂ TRÁNH HEADER */}
      <section className="header-section relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/giai-phong-dan-toc/cach-mang-giai-phong-dan-toc.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-3 sm:px-6 max-w-6xl w-full mt-20 sm:mt-24">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 
                         drop-shadow-2xl leading-tight">
            Cách mạng giải phóng dân tộc
          </h1>
          <p className="text-sm sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed px-2">
            Tư tưởng Hồ Chí Minh về con đường giải phóng dân tộc Việt Nam
          </p>
          
          {/* Hero Video */}
          <div className="relative max-w-xs sm:max-w-2xl lg:max-w-5xl mx-auto mb-6 sm:mb-8 group">
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
              onLoadedData={handleLoadedData}
              onDurationChange={handleVideoMetadata}
              onCanPlay={handleVideoMetadata}
              onError={() => console.log("Video load error")}
            >
              <source src="/videos/tuyen-ngon-doc-lap.mp4" type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>
            
            {/* FALLBACK IMAGE */}
            <div className="absolute inset-0 bg-gray-800/80 rounded-lg flex items-center justify-center
                          opacity-0 transition-opacity duration-300"
                 style={{
                   opacity: videoRef.current?.error ? 1 : 0
                 }}>
              <div className="text-center text-white p-4 sm:p-6">
                <Play className="w-12 h-12 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-4 opacity-70" />
                <p className="text-base sm:text-lg opacity-90 mb-1 sm:mb-2">Video</p>
                <p className="text-xs sm:text-sm opacity-70">Cách mạng giải phóng dân tộc</p>
              </div>
            </div>
            
            {/* NÚT PLAY */}
            {!isVideoPlaying && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                <button
                  onClick={toggleVideo}
                  className="bg-red-600/90 hover:bg-red-600 text-white p-4 sm:p-6 rounded-full
                             transition-all duration-300 hover:scale-110 backdrop-blur-sm
                             shadow-2xl border-2 sm:border-4 border-white/30 animate-pulse"
                  aria-label="Play video"
                >
                  <Play className="w-8 h-8 sm:w-12 sm:h-12 ml-1" />
                </button>
              </div>
            )}

            {/* VIDEO LABEL */}
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/70 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
              📹 Video
            </div>
            
            {/* NÚT PLAY/PAUSE */}
            {isVideoPlaying && !isMobile && (
              <div className="absolute inset-0 flex items-center justify-center 
                            bg-black/20 opacity-0 group-hover:opacity-100 
                            transition-opacity duration-300 rounded-lg">
                <button
                  onClick={toggleVideo}
                  className="bg-red-600/90 hover:bg-red-600 text-white p-5 rounded-full
                             transition-all duration-300 hover:scale-110 backdrop-blur-sm
                             shadow-lg"
                  aria-label="Pause video"
                >
                  <Pause size={36} />
                </button>
              </div>
            )}
            
            {/* CONTROLS CONTAINER */}
            <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent
                          ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} 
                          transition-opacity duration-300 rounded-b-lg p-2 sm:p-4`}>
              
              {/* THANH PROGRESS BAR */}
              <div className="mb-2 sm:mb-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={duration > 0 ? (currentTime / duration) * 100 : 0}
                  onChange={handleProgressChange}
                  className="w-full h-1 sm:h-2 bg-white/30 rounded-lg appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-3 sm:[&::-webkit-slider-thumb]:w-4 
                           [&::-webkit-slider-thumb]:h-3 sm:[&::-webkit-slider-thumb]:h-4 
                           [&::-webkit-slider-thumb]:rounded-full 
                           [&::-webkit-slider-thumb]:bg-red-600
                           [&::-webkit-slider-thumb]:cursor-pointer
                           [&::-webkit-slider-thumb]:shadow-lg
                           [&::-moz-range-thumb]:w-3 sm:[&::-moz-range-thumb]:w-4 
                           [&::-moz-range-thumb]:h-3 sm:[&::-moz-range-thumb]:h-4 
                           [&::-moz-range-thumb]:rounded-full 
                           [&::-moz-range-thumb]:bg-red-600
                           [&::-moz-range-thumb]:cursor-pointer
                           [&::-moz-range-thumb]:border-none
                           [&::-moz-range-thumb]:shadow-lg"
                />
              </div>

              {/* BOTTOM CONTROLS */}
              <div className="flex items-center justify-between">
                {/* TIME DISPLAY */}
                <div className="text-white text-xs sm:text-sm font-medium bg-black/30 px-1 py-0.5 sm:px-2 sm:py-1 rounded">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>

                {/* CONTROL BUTTONS */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Play/Pause Button */}
                  {isMobile && (
                    <button
                      onClick={toggleVideo}
                      className="bg-red-600/80 hover:bg-red-600 text-white p-1.5 sm:p-2 rounded-full
                               transition-all duration-300"
                      aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                    >
                      {isVideoPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                  )}

                  {/* Volume Button */}
                  <button
                    onClick={toggleMute}
                    className="bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full
                             transition-all duration-300"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Video title overlay */}
            {!isMobile && (
              <div className="absolute top-4 left-4">
                <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-lg">Tuyên ngôn độc lập</h3>
                  <p className="text-sm opacity-90">2 tháng 9 năm 1945</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Steps Overview */}
      <section className="steps-container py-12 sm:py-20 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-16 px-2">
            Năm luận điểm cơ bản
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {revolutionSteps.map((step, index) => (
              <div
                key={step.id}
                className={`step-card cursor-pointer group relative overflow-hidden
                           bg-gradient-to-br ${step.color} text-white p-4 sm:p-6 rounded-xl
                           shadow-lg hover:shadow-xl transition-all duration-300
                           hover:-translate-y-1 min-h-[160px] sm:min-h-[200px] flex flex-col
                           ${currentStep === index ? 'ring-2 sm:ring-4 ring-white/50 scale-105' : ''}`}
                onClick={() => scrollToSection(index)}
              >
                <div className="relative z-10 flex-1 flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl font-bold mb-2 transition-transform duration-200">
                    {step.id}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-90">{step.subtitle}</p>
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
          className={`content-section-${index} py-12 sm:py-20 px-3 sm:px-6 ${
            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center ${
              index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
            }`}>
              {/* Content */}
              <div className={index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${step.color} 
                                   text-white rounded-full flex items-center justify-center
                                   text-lg sm:text-xl font-bold flex-shrink-0 mt-1 sm:mt-0`}>
                      {step.id}
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-tight mb-1">
                        {step.title}
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600">{step.subtitle}</p>
                    </div>
                  </div>

                  <blockquote className="relative border-l-4 border-red-600 pl-4 sm:pl-6 py-4 sm:py-6 
                                       bg-gradient-to-r from-red-50 to-orange-50 
                                       rounded-r-lg shadow-md">
                    <div className="absolute top-1 left-1 sm:top-2 sm:left-2 text-red-300 text-2xl sm:text-4xl leading-none">"</div>
                    <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 italic 
                                 leading-relaxed pl-4 sm:pl-6">
                      {step.quote}
                    </p>
                    <div className="absolute bottom-1 right-2 sm:bottom-2 sm:right-4 text-red-300 text-2xl sm:text-4xl leading-none 
                                   transform rotate-180">"</div>
                    <cite className="block text-right mt-3 sm:mt-4 text-red-700 font-medium text-xs sm:text-sm">
                      — Chủ tịch Hồ Chí Minh
                    </cite>
                  </blockquote>

                  <ul className="space-y-3 sm:space-y-4">
                    {step.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 sm:gap-3">
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-br ${step.color} 
                                       rounded-full mt-2 flex-shrink-0`} />
                        <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Media */}
              <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} mt-6 lg:mt-0`}>
                <div className="relative group">
                  <div className="relative overflow-visible">
                    <div className={`absolute -top-4 -right-4 sm:-top-8 sm:-right-8 w-16 h-16 sm:w-32 sm:h-32 bg-gradient-to-br ${step.color} 
                                   rounded-full opacity-20 blur-xl`} />
                    <div className={`absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br ${step.color} 
                                   rounded-full opacity-30 blur-lg`} />
                    
                    <div className="relative z-10 bg-white p-3 sm:p-4 rounded-xl shadow-2xl 
                                   transform rotate-1 sm:rotate-2 group-hover:rotate-0 transition-all duration-500
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
                          <div className="text-center text-white p-3 sm:p-4">
                            <h4 className="font-bold text-base sm:text-lg mb-2">{step.title}</h4>
                            <p className="text-xs sm:text-sm">{step.altText}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 sm:mt-4 text-center">
                        <p className="text-gray-600 text-xs sm:text-sm italic">{step.altText}</p>
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
      <section className="py-12 sm:py-20 px-3 sm:px-6 bg-gradient-to-br from-red-800 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
            Ý nghĩa lịch sử
          </h2>
          <p className="text-base sm:text-xl leading-relaxed mb-6 sm:mb-8 px-2">
            Tư tưởng Hồ Chí Minh về cách mạng giải phóng dân tộc không chỉ có ý nghĩa 
            đối với Việt Nam mà còn đóng góp quan trọng vào kho tàng lý luận cách mạng 
            của nhân loại.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Sáng tạo lý luận</h3>
              <p className="text-sm sm:text-base">Bổ sung và phát triển chủ nghĩa Mác-Lênin phù hợp với điều kiện Việt Nam</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Thực tiễn thành công</h3>
              <p className="text-sm sm:text-base">Dẫn dắt cách mạng Việt Nam từ thắng lợi này đến thắng lợi khác</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Giá trị toàn cầu</h3>
              <p className="text-sm sm:text-base">Định hướng cho các dân tộc bị áp bức trên thế giới</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}