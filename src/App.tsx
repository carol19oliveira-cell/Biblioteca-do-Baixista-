/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Check, 
  Sparkles, 
  Music, 
  FileText, 
  Zap, 
  Layers, 
  Clock, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  ThumbsUp,
  Hash,
  ArrowRight,
  Flame,
  Sliders,
  Target
} from "lucide-react";

// @ts-ignore
import packCover from "./assets/images/pack_cover_art_1783708433651.jpg";
import VideoPlayerMock from "./components/VideoPlayerMock";
import FaqSection from "./components/FaqSection";
import SocialProofToast from "./components/SocialProofToast";
import CheckoutModal from "./components/CheckoutModal";
import { BenefitCard } from "./types";

const benefitsData: BenefitCard[] = [
  {
    id: "frases",
    title: "FRASES MUSICAIS",
    description: "Frases musicais cuidadosamente selecionadas para enriquecer suas linhas com mais musicalidade, criatividade e bom gosto.",
    label: "Direto ao Ponto",
    iconName: "music"
  },
  {
    id: "impacto",
    title: "FRASES DE IMPACTO",
    description: "Frases mais elaboradas e marcantes para criar momentos de destaque, surpreender e elevar o nível das suas linhas.",
    label: "Destaque e Técnica",
    iconName: "flame"
  },
  {
    id: "ritmicas",
    title: "🥁 FRASES RÍTMICAS",
    description: "Frases focadas em groove e acentuação rítmica para deixar suas linhas muito mais firmes e impactantes.",
    label: "Groove e Precisão",
    iconName: "target"
  },
  {
    id: "versoes",
    title: "TRÊS VERSÕES DE ESTUDO",
    description: "Cada frase acompanha:\n\n• Playback para ouvir a aplicação musical.\n• Metrônomo para entender o tempo exato da entrada.\n• Versão lenta para facilitar o aprendizado.",
    label: "Acelerador de Resultados",
    iconName: "sliders"
  },
  {
    id: "acesso",
    title: "ACESSO IMEDIATO",
    description: "Após a confirmação do pagamento, você recebe acesso imediato à biblioteca diretamente no seu e-mail.",
    label: "Acesso Vitalício",
    iconName: "clock"
  }
];

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Countdown Timer of 15 minutes
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("bass_countdown_time");
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    return 15 * 60;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const nextTime = prev <= 1 ? 15 * 60 : prev - 1;
        localStorage.setItem("bass_countdown_time", nextTime.toString());
        return nextTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Helper to render lucide icons dynamically
  const renderIcon = (name: string) => {
    const props = { className: "w-6 h-6 text-brand-orange" };
    switch (name) {
      case "music": return <Music {...props} />;
      case "flame": return <Flame {...props} />;
      case "sliders": return <Sliders {...props} />;
      case "hash": return <Hash {...props} />;
      case "fileText": return <FileText {...props} />;
      case "zap": return <Zap {...props} />;
      case "layers": return <Layers {...props} />;
      case "clock": return <Clock {...props} />;
      case "target": return <Target {...props} />;
      default: return <Music {...props} />;
    }
  };

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleScrollToOffer = () => {
    const ctaSection = document.getElementById("cta-section");
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-slate-100 font-sans selection:bg-brand-orange selection:text-white relative overflow-hidden">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] ambient-glow-orange pointer-events-none opacity-40" />
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] ambient-glow-amber pointer-events-none opacity-30" />
      <div className="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] ambient-glow-orange pointer-events-none opacity-30" />

      {/* Header Announcement Badge */}
      <div className="w-full bg-red-600 py-2 px-4 text-center relative z-50">
        <p className="text-xs md:text-sm font-bold text-white flex items-center justify-center gap-2 truncate">
          <Clock className="w-4 h-4 text-white animate-pulse flex-shrink-0" />
          <span>Últimos dias para garantir com o valor promocional 🔥</span>
        </p>
      </div>

      <main className="w-full space-y-24 py-12 md:py-20">
        
        {/* ================= HERO SECTION ================= */}
        <section id="hero-section" className="text-center space-y-12 max-w-6xl mx-auto px-6">
          {/* Main Headings */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h2 className="text-lg md:text-xl font-mono uppercase tracking-[0.25em] text-slate-400 font-medium">
              Todo grande baixista tem um segredo:
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold italic tracking-tight text-white uppercase leading-none">
              um repertório enorme de <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber drop-shadow-[0_2px_15px_rgba(249,115,22,0.3)] px-2">FRASES</span> na cabeça.
            </h1>
          </div>

          {/* Cover Artwork directly below headline */}
          <div className="w-full max-w-sm md:max-w-md mx-auto aspect-square relative group">
            {/* Glowing border frame */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange to-brand-amber rounded-2xl blur opacity-35 group-hover:opacity-60 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/40 via-white/5 to-brand-amber/40 rounded-2xl p-[1px]">
              <div className="h-full w-full bg-brand-dark rounded-2xl overflow-hidden relative">
                <img
                  src="https://i.ibb.co/M56845tH/IMG-1331.webp"
                  alt="Biblioteca de Frases Cover Art"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Headline description paragraph, now below the image */}
          <div className="space-y-6">
            <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed px-4">
              Uma biblioteca de frases <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber font-extrabold">EXCLUSIVAS</span> e de alto impacto para você estudar, adaptar e desenvolver linhas de baixo que realmente chamam atenção.
            </p>
            
            <div className="flex justify-center items-center">
              <button 
                onClick={handleScrollToOffer}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber font-extrabold text-white text-sm tracking-wide uppercase hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/25 group"
              >
                Garantir Minha Biblioteca
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>

        {/* ================= DEMO VIDEO SECTION ================= */}
        <section id="video-section" className="text-center space-y-10 py-10 max-w-6xl mx-auto px-6">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-5xl font-display font-extrabold italic tracking-tight text-white uppercase">
              Frases prontas para <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber px-2">estudar e aplicar</span>
            </h2>
          </div>

          {/* Styled Demo Image */}
          <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/[0.08] bg-brand-card shadow-2xl shadow-brand-orange/5 group">
            {/* Glowing border effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange to-brand-amber rounded-2xl blur opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
            <img
              src="https://i.ibb.co/rG1vJppw/Chat-GPT-Image-10-de-jul-de-2026-16-21-13.webp"
              alt="Frases de Exemplo"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover rounded-2xl relative z-10 transition-transform duration-500 hover:scale-[1.01]"
            />
          </div>
        </section>

        {/* ================= GRID / BENEFITS SECTION ================= */}
        <section className="space-y-14 py-10 relative max-w-6xl mx-auto px-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] ambient-glow-orange pointer-events-none opacity-20" />
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-brand-orange">
              Vídeos + suporte whatsapp
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold italic tracking-tight text-white uppercase">
              O que você <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber px-2">recebe</span>
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {benefitsData.map((item) => (
              <div
                key={item.id}
                className="group relative p-6 md:p-8 rounded-2xl bg-brand-card/40 border border-white/[0.05] hover:border-brand-orange/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between gap-6 hover:shadow-xl hover:shadow-brand-orange/5"
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-orange/0 via-brand-orange/30 to-brand-orange/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="space-y-4">
                  {/* Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shadow-inner">
                    {renderIcon(item.iconName)}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-white uppercase font-display tracking-tight group-hover:text-brand-orange transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Badge Bottom label */}
                <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between">
                  <span className="text-xs font-mono text-brand-amber font-semibold tracking-wide uppercase flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-brand-orange" />
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= WHY STUDY PHRASES SECTION ================= */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="py-16 md:py-24 relative z-10 border-t border-b border-white/[0.04] overflow-hidden w-full bg-gradient-to-b from-brand-dark via-brand-orange/[0.04] to-brand-dark"
        >
          {/* Subtle background ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] ambient-glow-orange pointer-events-none opacity-10 blur-3xl" />
          
          <div className="max-w-3xl mx-auto px-6 space-y-8 relative z-10">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-brand-orange flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
                POR QUE ESTUDAR FRASES?
              </span>
              
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white uppercase italic tracking-tight leading-none">
                O ATALHO PARA UMA <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber drop-shadow-[0_2px_10px_rgba(249,115,22,0.2)] px-2">EXECUÇÃO PROFISSIONAL</span>
              </h3>

              <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed pt-2">
                <p>
                  Grandes baixistas não criam todas as ideias do zero.
                </p>
                <p>
                  Eles desenvolvem seu repertório estudando frases, adaptando ideias e incorporando novos recursos ao próprio jeito de tocar.
                </p>
                <p>
                  Quanto maior o repertório de frases, mais natural se torna criar linhas interessantes, improvisar com segurança e tocar com mais criatividade.
                </p>
                <p className="text-white font-semibold border-l-2 border-brand-orange pl-3 py-0.5">
                  A Biblioteca de Frases foi criada exatamente para acelerar esse processo, reunindo ideias práticas que você poderá estudar, adaptar e aplicar no seu próprio estilo.
                </p>
              </div>
            </div>

            {/* Três pequenos benefícios com ícones */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-brand-orange/15 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0 shadow-inner">
                  <Music className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm md:text-base uppercase font-display tracking-wide">
                    Amplie seu repertório musical
                  </h4>
                  <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                    Descubra caminhos melódicos e rítmicos que transformam grooves simples em linhas profissionais.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-brand-orange/15 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0 shadow-inner">
                  <Zap className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm md:text-base uppercase font-display tracking-wide">
                    Tenha novas ideias para criar linhas de baixo
                  </h4>
                  <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                    Nunca mais fique sem ideias ou travado na hora de criar ou improvisar uma condução.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-brand-orange/15 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0 shadow-inner">
                  <Target className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm md:text-base uppercase font-display tracking-wide">
                    Estude frases prontas e adapte ao seu estilo
                  </h4>
                  <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                    Absorva a linguagem musical de forma prática e aplique no seu som imediatamente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ================= CTA BUY SECTION ================= */}
        <section id="cta-section" className="py-12 relative z-10 max-w-xl mx-auto px-6 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-orange to-brand-amber rounded-3xl blur-2xl opacity-10 -z-10" />

          {/* Urgency countdown timer */}
          <div className="mb-6 inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/25 px-5 py-2.5 rounded-full shadow-inner animate-pulse">
            <Clock className="w-4 h-4 text-brand-orange" />
            <span className="text-sm md:text-base font-semibold text-white tracking-wide">
              Desconto Especial Expira em: <span className="text-brand-orange font-mono font-bold">{formatTime(timeLeft)}</span>
            </span>
          </div>

          {/* Golden Badge Border styling */}
          <div className="relative rounded-2xl p-8 md:p-12 bg-gradient-to-b from-[#121634]/90 to-brand-card/90 border border-brand-orange/30 shadow-2xl space-y-8">
            <div className="flex justify-center">
              <span className="px-4 py-1.5 rounded-full bg-brand-orange text-white font-mono text-xs font-bold uppercase tracking-wider animate-pulse shadow-md shadow-brand-orange/20">
                COMECE HOJE MESMO
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-slate-400 text-sm font-medium">
                De <span className="line-through text-red-500 font-bold">R$79</span> por apenas
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl md:text-4xl font-extrabold text-brand-orange">R$</span>
                <span className="text-7xl md:text-8xl font-black font-display text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 leading-none drop-shadow-md px-2">
                  37,90
                </span>
              </div>
              <p className="text-2xs font-mono text-brand-amber uppercase tracking-widest pt-2">
                * Pagamento único. Sem mensalidades.
              </p>

              <div className="pt-6 pb-4 border-t border-white/[0.05] text-left max-w-xs md:max-w-sm mx-auto space-y-2.5">
                {[
                  "Biblioteca de Frases para Contrabaixo",
                  "Frases Musicais",
                  "Frases de Impacto",
                  "Frases Rítmicas",
                  "Playback de todas as frases",
                  "Versão com metrônomo",
                  "Versão lenta",
                  "Acesso imediato",
                  "Suporte via WhatsApp"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="text-brand-orange font-bold text-base select-none leading-none shrink-0">✔</span>
                    <span className="font-medium text-slate-200 leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Big Action Button */}
            <div className="space-y-4">
              <motion.a
                href="https://pay.cakto.com.br/73jcq4o_973479"
                target="_blank"
                rel="noopener noreferrer"
                animate={{
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-amber font-extrabold text-white text-base tracking-wider uppercase hover:opacity-95 transition-all cursor-pointer shadow-xl shadow-brand-orange/25 flex justify-center items-center gap-2 group relative overflow-hidden"
              >
                {/* Simple shine effect */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shine" />
                
                QUERO MEU ACESSO AGORA
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.a>

              {/* Secure checkout seals */}
              <div className="flex justify-center items-center gap-6 text-[10px] font-mono text-slate-400 pt-2 border-t border-white/[0.04]">
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-brand-orange" />
                  Compra 100% Segura
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-orange" />
                  Acesso Imediato
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-3.5 h-3.5 text-brand-orange" />
                  Garantia de Satisfação
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <FaqSection />

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="w-full border-t border-white/[0.05] bg-black/40 py-10 px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-1.5 text-slate-400 text-sm">
          <p className="font-bold text-white font-display tracking-wider uppercase">BÍBLIOTECA DE FRASES PARA CONTRABAIXO</p>
          <p className="text-xs text-slate-500">Todos os direitos reservados © 2026</p>
        </div>
      </footer>

      {/* ================= POPUP / PORTAL WIDGETS ================= */}
      <SocialProofToast />
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        price={37.9}
      />
    </div>
  );
}
