/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  ArrowDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export interface CustomerPrint {
  id: string;
  imageUrl: string;
  fallbackUrl?: string;
  label?: string;
  alt?: string;
}

export const DEFAULT_CUSTOMER_PRINTS: CustomerPrint[] = [
  {
    id: "print-4",
    imageUrl: "/images/depoimentos/depoimento-4.jpg",
    fallbackUrl: "https://i.ibb.co/F4dt9y5g/Whats-App-Image-2026-10-25-at-20-20-48-4.jpg",
    label: "Depoimento de Aluno",
    alt: "Depoimento de aluno sobre a Biblioteca de Frases (Manão, já comprei 15 pack de frases...)"
  },
  {
    id: "print-5",
    imageUrl: "/images/depoimentos/depoimento-5.jpg",
    fallbackUrl: "https://i.ibb.co/VYLCZB2q/Whats-App-Image-2026-10-25-at-20-20-48-5.jpg",
    label: "Depoimento de Aluno",
    alt: "Depoimento de aluno sobre a Galeria de Frases (comprei a galeria de frases, que investimento certeiro...)"
  },
  {
    id: "print-1",
    imageUrl: "/images/depoimentos/depoimento-1.jpg",
    fallbackUrl: "https://i.ibb.co/5bGj9TJ/Whats-App-Image-2026-10-25-at-20-20-48-1.jpg",
    label: "Depoimento de Aluno",
    alt: "Print de depoimento de baixista sobre a Biblioteca de Frases (Já comprei e tô amando cada frase!! Top demaaaaaais!!! Valeu mestre!)"
  },
  {
    id: "print-2",
    imageUrl: "/images/depoimentos/depoimento-2.jpg",
    fallbackUrl: "https://i.ibb.co/6RcWgKJh/Whats-App-Image-2026-10-25-at-20-20-48-2.jpg",
    label: "Depoimento de Aluno",
    alt: "Print de depoimento de baixista sobre a Biblioteca de Frases (Fala meu irmão tudo bem? Adquiri seu curso e gostei bastante)"
  },
  {
    id: "print-7",
    imageUrl: "/images/depoimentos/depoimento-7.jpg",
    fallbackUrl: "https://i.ibb.co/3mSyCvVD/Whats-App-Image-2026-10-25-at-20-20-48.jpg",
    label: "Depoimento de Aluno",
    alt: "Print de depoimento de baixista sobre a Biblioteca de Frases (Gracas a Deus achei um conteudo barato...)"
  },
  {
    id: "print-6",
    imageUrl: "/images/depoimentos/depoimento-6.jpg",
    fallbackUrl: "https://i.ibb.co/XxwzYhTp/Whats-App-Image-2026-10-25-at-20-20-48-6.jpg",
    label: "Depoimento de Aluno",
    alt: "Print de depoimento de baixista sobre a Biblioteca de Frases (Rapaz, eu sou ruim em criar frases kkkk / Seu curso é top demais)"
  }
];

interface SocialProofSectionProps {
  prints?: CustomerPrint[];
}

export default function SocialProofSection({ prints = DEFAULT_CUSTOMER_PRINTS }: SocialProofSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeSlideRef = useRef<HTMLDivElement>(null);

  const [activeZoomImage, setActiveZoomImage] = useState<{ url: string; alt?: string } | null>(null);
  const [imageSources, setImageSources] = useState<{ [key: string]: string }>({});
  const [hasReachedSection, setHasReachedSection] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<number | null>(null);
  const initializedRef = useRef(false);
  const scrollPosRef = useRef<number>(0);

  // Mobile dynamic height and navigation states
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobileHeight, setMobileHeight] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  // Touch and drag tracking for mobile
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);

  const getImageSrc = (print: CustomerPrint) => {
    return imageSources[print.id] || print.imageUrl;
  };

  const handleImageError = (print: CustomerPrint) => {
    if (print.fallbackUrl && imageSources[print.id] !== print.fallbackUrl) {
      setImageSources((prev) => ({
        ...prev,
        [print.id]: print.fallbackUrl!
      }));
    }
  };

  // Pre-cache all prints for instantaneous loading
  useEffect(() => {
    prints.forEach((print) => {
      const img = new Image();
      img.src = getImageSrc(print);
    });
  }, [prints]);

  // Triple the prints to provide a seamless infinite wrap on desktop
  const triplePrints = [...prints, ...prints, ...prints];

  // Initialize desktop scroll position to middle set once rendered
  const initMiddlePosition = () => {
    const el = scrollContainerRef.current;
    if (!el || initializedRef.current) return;
    const setWidth = el.scrollWidth / 3;
    if (setWidth > 200) {
      el.scrollLeft = setWidth;
      scrollPosRef.current = setWidth;
      initializedRef.current = true;
    }
  };

  useEffect(() => {
    initMiddlePosition();
    const timer = setTimeout(initMiddlePosition, 300);
    return () => clearTimeout(timer);
  }, [prints]);

  // Check visibility on mount and with IntersectionObserver
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const checkInitialVisibility = () => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        setHasReachedSection(true);
        setIsSectionVisible(true);
        initMiddlePosition();
      }
    };
    checkInitialVisibility();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasReachedSection(true);
            setIsSectionVisible(true);
            initMiddlePosition();
          } else {
            setIsSectionVisible(false);
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Update dynamic height for current mobile slide
  const updateMobileHeight = () => {
    if (activeSlideRef.current) {
      const h = activeSlideRef.current.offsetHeight;
      if (h > 20) {
        setMobileHeight(h);
      }
    }
  };

  useEffect(() => {
    updateMobileHeight();
    const timer = setTimeout(updateMobileHeight, 60);

    if (activeSlideRef.current && typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => {
        updateMobileHeight();
      });
      ro.observe(activeSlideRef.current);
      return () => {
        clearTimeout(timer);
        ro.disconnect();
      };
    }
    return () => clearTimeout(timer);
  }, [mobileIndex, imageSources]);

  // Helper to pause auto-scroll / auto-advance temporarily during manual interaction
  const pauseTemporarily = (durationMs = 4500) => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      window.clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = window.setTimeout(() => {
      const el = scrollContainerRef.current;
      if (el) {
        scrollPosRef.current = el.scrollLeft;
      }
      setIsPaused(false);
      pauseTimeoutRef.current = null;
    }, durationMs);
  };

  // Mobile navigation handlers
  const handleMobileNext = () => {
    pauseTemporarily(4500);
    setSlideDirection(1);
    setMobileIndex((prev) => (prev + 1) % prints.length);
  };

  const handleMobilePrev = () => {
    pauseTemporarily(4500);
    setSlideDirection(-1);
    setMobileIndex((prev) => (prev - 1 + prints.length) % prints.length);
  };

  // Touch and swipe gesture handlers for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    pauseTemporarily(5000);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Horizontal swipe detection (ensure user didn't just scroll down)
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        handleMobileNext();
      } else {
        handleMobilePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const onMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    pauseTemporarily(5000);
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (mouseStartX.current !== null) {
      const deltaX = e.clientX - mouseStartX.current;
      if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
          handleMobileNext();
        } else {
          handleMobilePrev();
        }
      }
      mouseStartX.current = null;
    }
  };

  // Continuous SLOW auto-scroll on desktop (24px/s)
  useEffect(() => {
    if (!hasReachedSection || !isSectionVisible || isPaused) return;

    // Check if on desktop
    if (window.innerWidth >= 768) {
      const el = scrollContainerRef.current;
      if (!el) return;

      scrollPosRef.current = el.scrollLeft;

      let animId: number;
      let lastTime = performance.now();
      const speed = 24; // 24px/s: calmo e suave

      const loop = (currentTime: number) => {
        const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
        lastTime = currentTime;

        const container = scrollContainerRef.current;
        if (container) {
          scrollPosRef.current += speed * delta;

          const setWidth = container.scrollWidth / 3;
          if (setWidth > 0) {
            if (scrollPosRef.current >= setWidth * 2) {
              scrollPosRef.current -= setWidth;
            } else if (scrollPosRef.current <= setWidth * 0.15) {
              scrollPosRef.current += setWidth;
            }
          }

          container.scrollLeft = scrollPosRef.current;
        }

        animId = requestAnimationFrame(loop);
      };

      animId = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(animId);
    } else {
      // Slow auto-advance on mobile (every 5 seconds)
      const mobileInterval = setInterval(() => {
        setSlideDirection(1);
        setMobileIndex((prev) => (prev + 1) % prints.length);
      }, 5000);

      return () => clearInterval(mobileInterval);
    }
  }, [hasReachedSection, isSectionVisible, isPaused, prints.length]);

  // Desktop Advance: Próximo Depoimento
  const handleDesktopNext = () => {
    pauseTemporarily(3500);
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = Math.min(el.clientWidth * 0.85, 360);
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });

    setTimeout(() => {
      if (el) {
        scrollPosRef.current = el.scrollLeft;
        const setWidth = el.scrollWidth / 3;
        if (setWidth > 0 && el.scrollLeft >= setWidth * 2) {
          el.scrollLeft -= setWidth;
          scrollPosRef.current = el.scrollLeft;
        }
      }
    }, 350);
  };

  // Desktop Advance: Depoimento Anterior
  const handleDesktopPrev = () => {
    pauseTemporarily(3500);
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = Math.min(el.clientWidth * 0.85, 360);
    el.scrollBy({ left: -scrollAmount, behavior: "smooth" });

    setTimeout(() => {
      if (el) {
        scrollPosRef.current = el.scrollLeft;
        const setWidth = el.scrollWidth / 3;
        if (setWidth > 0 && el.scrollLeft <= setWidth * 0.25) {
          el.scrollLeft += setWidth;
          scrollPosRef.current = el.scrollLeft;
        }
      }
    }, 350);
  };

  // Unified Prev & Next for bottom controls
  const handlePrev = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      handleMobilePrev();
    } else {
      handleDesktopPrev();
    }
  };

  const handleNext = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      handleMobileNext();
    } else {
      handleDesktopNext();
    }
  };

  const currentMobilePrint = prints[mobileIndex] || prints[0];

  return (
    <section 
      ref={sectionRef} 
      className="pt-6 pb-4 md:pt-11 md:pb-6 relative z-10 w-full overflow-hidden bg-gradient-to-b from-[#090d20] via-[#111938] to-[#090d20] border-y border-brand-orange/20 shadow-[inset_0_1px_0_rgba(249,115,22,0.15),inset_0_-1px_0_rgba(249,115,22,0.15)]"
    >
      {/* Top and Bottom Glowing Accent Lines */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-orange/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent pointer-events-none" />

      {/* Atmospheric Stage & Studio Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] max-w-full h-[260px] bg-gradient-to-b from-brand-orange/20 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-indigo-600/15 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[160px] bg-brand-orange/10 blur-2xl pointer-events-none" />

      {/* Subtle Studio Texture Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(249,115,22,0.15)_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col">
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center max-w-4xl mx-auto space-y-1.5 md:space-y-2">
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-display font-black text-white uppercase italic tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            QUEM JÁ ENTROU, RECOMENDA.
          </h3>

          <p className="text-sm sm:text-base md:text-xl font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-300 to-brand-amber">
            VEJA O QUE OS BAIXISTAS ESTÃO DIZENDO
          </p>
        </div>
      </div>

      {/* ================= MOBILE DYNAMIC HEIGHT CAROUSEL (< 768px) ================= */}
      <div className="block md:hidden relative w-full mt-4 select-none px-3">
        <div 
          className="relative w-full max-w-[340px] xs:max-w-[360px] mx-auto"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          {/* Floating lateral arrows centered on active print */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleMobilePrev();
            }}
            aria-label="Passar para depoimento anterior"
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/85 hover:bg-brand-orange border border-white/20 text-white flex items-center justify-center backdrop-blur-md shadow-xl transition-all active:scale-90"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleMobileNext();
            }}
            aria-label="Passar para próximo depoimento"
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/85 hover:bg-brand-orange border border-white/20 text-white flex items-center justify-center backdrop-blur-md shadow-xl transition-all active:scale-90"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dynamic Height Animated Container */}
          <motion.div
            className="overflow-hidden w-full transition-[height] duration-300 ease-out"
            animate={{ height: mobileHeight ? mobileHeight : "auto" }}
            transition={{ duration: 0.32, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait" initial={false} custom={slideDirection}>
              <motion.div
                key={mobileIndex}
                ref={activeSlideRef}
                custom={slideDirection}
                initial={{ opacity: 0, x: slideDirection * 35 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideDirection * -35 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="w-full flex items-center justify-center cursor-zoom-in"
                onClick={() => setActiveZoomImage({ url: getImageSrc(currentMobilePrint), alt: currentMobilePrint.alt })}
              >
                <img
                  src={getImageSrc(currentMobilePrint)}
                  alt={currentMobilePrint.alt || "Print de depoimento de aluno"}
                  onError={() => handleImageError(currentMobilePrint)}
                  onLoad={updateMobileHeight}
                  className="w-full h-auto block rounded-xl shadow-lg shadow-black/50 object-contain"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ================= DESKTOP CONTINUOUS HORIZONTAL CAROUSEL (>= 768px) ================= */}
      <div className="hidden md:block relative w-full overflow-hidden mt-5 md:mt-6 select-none group">
        {/* Gradient edge fades for smooth transition */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-[#111938] via-[#111938]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-[#111938] via-[#111938]/80 to-transparent z-10" />

        {/* Floating Lateral Navigation Arrows on Desktop */}
        <button
          type="button"
          onClick={handleDesktopPrev}
          aria-label="Passar para depoimento anterior"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/75 hover:bg-brand-orange border border-white/20 hover:border-brand-orange text-white flex items-center justify-center backdrop-blur-md shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          type="button"
          onClick={handleDesktopNext}
          aria-label="Passar para próximo depoimento"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/75 hover:bg-brand-orange border border-white/20 hover:border-brand-orange text-white flex items-center justify-center backdrop-blur-md shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Continuous Horizontal Scroll Track */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-none flex items-start gap-4 md:gap-5 py-2 px-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (pauseTimeoutRef.current) {
              window.clearTimeout(pauseTimeoutRef.current);
              pauseTimeoutRef.current = null;
            }
            if (scrollContainerRef.current) {
              scrollPosRef.current = scrollContainerRef.current.scrollLeft;
            }
            setIsPaused(false);
          }}
          onMouseDown={() => pauseTemporarily(3500)}
          onScroll={() => {
            if (isPaused && scrollContainerRef.current) {
              scrollPosRef.current = scrollContainerRef.current.scrollLeft;
            }
          }}
        >
          {triplePrints.map((print, idx) => (
            <div
              key={`${print.id}-${idx}`}
              className="w-[320px] md:w-[360px] lg:w-[390px] shrink-0 cursor-zoom-in transition-transform duration-300 hover:scale-[1.01]"
              onClick={() => setActiveZoomImage({ url: getImageSrc(print), alt: print.alt })}
            >
              <img
                src={getImageSrc(print)}
                alt={print.alt || "Print de depoimento de aluno"}
                onError={() => handleImageError(print)}
                onLoad={initMiddlePosition}
                className="w-full h-auto block rounded-xl shadow-lg shadow-black/40"
                loading="eager"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ================= CONTROLS (ANTERIOR / ARRASTE OU PASSE NAS SETAS / PRÓXIMO) ================= */}
      <div className="flex items-center justify-center gap-3 mt-3 sm:mt-3 px-3">
        <button
          type="button"
          onClick={handlePrev}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/[0.06] hover:bg-brand-orange text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white border border-white/10 hover:border-brand-orange transition-all duration-200 active:scale-95"
          aria-label="Voltar depoimento"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Anterior</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-400 select-none">
            Arraste ou passe nas setas
          </span>
          {/* Progress dots on mobile */}
          <div className="flex md:hidden items-center gap-1.5 mt-1">
            {prints.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  pauseTemporarily(5000);
                  setSlideDirection(i > mobileIndex ? 1 : -1);
                  setMobileIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === mobileIndex ? "w-4 bg-brand-orange" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Ir para depoimento ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/[0.06] hover:bg-brand-orange text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white border border-white/10 hover:border-brand-orange transition-all duration-200 active:scale-95"
          aria-label="Avançar depoimento"
        >
          <span>Próximo</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col">
        {/* ================= TRANSITION PHRASE (TIGHT & BALANCED SPACING) ================= */}
        <div className="mt-3 md:mt-4 text-center">
          <div className="inline-flex flex-col items-center gap-1.5 max-w-2xl mx-auto">
            {/* Elegant glowing divider */}
            <div className="flex items-center justify-center gap-3 w-full">
              <div className="h-[1px] flex-1 max-w-[80px] bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              <div className="h-[1px] flex-1 max-w-[80px] bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />
            </div>

            <p className="text-lg sm:text-xl md:text-2xl font-display font-extrabold uppercase italic tracking-tight text-white drop-shadow-[0_2px_12px_rgba(249,115,22,0.25)]">
              Agora é sua vez
            </p>

            <a
              href="#cta-section"
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-mono uppercase tracking-wider text-brand-orange hover:text-brand-amber transition-colors group"
            >
              <span>Aproveitar oferta especial</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* ================= LIGHTBOX ZOOM MODAL ================= */}
      <AnimatePresence>
        {activeZoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveZoomImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 md:p-8 flex items-center justify-center"
          >
            <div 
              className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveZoomImage(null)}
                className="absolute -top-12 right-0 p-2 text-slate-300 hover:text-white bg-white/10 rounded-full transition-colors"
                aria-label="Fechar ampliação"
              >
                <X className="w-6 h-6" />
              </button>

              <img
                src={activeZoomImage.url}
                alt={activeZoomImage.alt || "Depoimento ampliado"}
                className="max-h-[85vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />

              <p className="mt-3 text-xs font-mono text-slate-400">
                Toque fora ou clique no X para fechar
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
