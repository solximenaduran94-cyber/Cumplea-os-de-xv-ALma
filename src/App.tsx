import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, 
  MapPin, 
  Map, 
  Music, 
  Clock, 
  Heart, 
  Sparkles, 
  Gift, 
  Send, 
  Check, 
  Copy, 
  Moon, 
  UserPlus, 
  Plus, 
  Smile, 
  Wine, 
  ChevronDown,
  Volume2,
  Camera,
  QrCode,
  Upload
} from "lucide-react";
import ButterflyParticles from "./components/ButterflyParticles";
import Countdown from "./components/Countdown";
import MusicPlayer from "./components/MusicPlayer";
import { GuestConfirmation, Song } from "./types";
import almaPortrait1 from "./assets/images/alma1.jpg";
import almaPortrait2 from "./assets/images/alma2.jpg";
import almaPortrait3 from "./assets/images/alma3.jpg";
import almaPortrait4 from "./assets/images/alma4.jpg";
import almaPortrait5 from "./assets/images/alma5.jpg";
import almaPortrait6 from "./assets/images/alma6.jpg";
import almaPortrait7 from "./assets/images/alma7.jpg";
import almaPortrait8 from "./assets/images/alma8.jpg";
import almaPortrait9 from "./assets/images/alma9.jpg";
import almaPortrait10 from "./assets/images/alma10.jpg";
import pastelButterflyBg from "./assets/images/pastel_butterfly_bg_1782091831599.jpg";

const GALLERY_PHOTOS = [
  { src: almaPortrait1, title: "Luces de la Ciudad", sub: "Estilo", rotation: "hover:rotate-1 -rotate-2 sm:-rotate-3" },
  { src: almaPortrait2, title: "Sobre Ruedas", sub: "Mi Pasión", rotation: "hover:rotate-1 rotate-1 sm:rotate-2" },
  { src: almaPortrait3, title: "Estilo y Libertad", sub: "Alegría", rotation: "hover:rotate-2 -rotate-1 sm:-rotate-1" },
  { src: almaPortrait4, title: "Instantes Dorados", sub: "Sencillez", rotation: "hover:rotate-1 rotate-2 sm:rotate-3" },
  { src: almaPortrait5, title: "Reflejo Nocturno", sub: "Destellos", rotation: "hover:rotate-1 -rotate-2 sm:-rotate-2" },
  { src: almaPortrait6, title: "Frente al Agua", sub: "Elegancia", rotation: "hover:-rotate-1 rotate-2 sm:rotate-3" },
  { src: almaPortrait7, title: "Momentos Únicos", sub: "Dulzura", rotation: "hover:rotate-1 -rotate-1 sm:-rotate-2" },
  { src: almaPortrait8, title: "Miradas del Alma", sub: "Ilusión", rotation: "hover:-rotate-1 rotate-1 sm:rotate-2" },
  { src: almaPortrait9, title: "Detener el Tiempo", sub: "Magia", rotation: "hover:rotate-1 -rotate-2 sm:-rotate-1" },
  { src: almaPortrait10, title: "Mis Dulces Quince", sub: "Felicidad", rotation: "hover:rotate-2 rotate-2 sm:rotate-1" },
];

export default function App() {
  // Target Event Date is 2026-08-08 at 21:00
  const targetDate = "2026-08-08T21:00:00";
  
  // States
  const [aliasCopied, setAliasCopied] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  // RSVP Form State
  const [rsvp, setRsvp] = useState<GuestConfirmation>({
    fullName: "",
    isAttending: true,
    dietaryRestrictions: "",
    totalGuests: 1,
    wishes: ""
  });
  
  const [rsvpWishes, setRsvpWishes] = useState<string[]>(() => {
    const saved = localStorage.getItem("alma_wishes");
    return saved ? JSON.parse(saved) : [
      "¡Qué emoción, Alma! No vemos la hora de celebrar con vos tus 15 años.",
      "Te deseamos una noche mágica, llena de sorpresas y alegría.",
      "¡Felicidades, hermosa! Qué lindo compartir este día tan soñado"
    ];
  });

  const [messageSent, setMessageSent] = useState(false);

  // Copy Alias to clipboard
  const handleCopyAlias = () => {
    navigator.clipboard.writeText("Almaleguiza.xv");
    setAliasCopied(true);
    setTimeout(() => setAliasCopied(false), 3000);
  };

  // Submit RSVP Form (Creates WhatsApp link and locally saves wishes)
  const handleSubmitRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvp.fullName.trim()) return;

    // Save elegant wish to local display board
    if (rsvp.wishes.trim()) {
      const updatedWishes = [rsvp.wishes, ...rsvpWishes];
      setRsvpWishes(updatedWishes);
      localStorage.setItem("alma_wishes", JSON.stringify(updatedWishes));
    }

    // Generate beautifully structured WhatsApp message (no icons/emojis, as requested)
    const waNumber = "5492477618053"; // Argentine format for 2477618053 (mother's number)
    const attendText = rsvp.isAttending ? "SI, de todas maneras!" : "Lamentablemente no podre estar";
    const dietaryText = rsvp.dietaryRestrictions ? rsvp.dietaryRestrictions : "Ninguna";
    
    const message = `*CONFIRMACION DE ASISTENCIA - MIS 15 ALMA*\n\n` +
      `*Nombre del invitado:* ${rsvp.fullName}\n` +
      `*Asistencia:* ${attendText}\n` +
      `*Cantidad de personas:* ${rsvp.totalGuests}\n` +
      `*Menu Diferenciado / Alergias:* ${dietaryText}\n` +
      (rsvp.wishes ? `*Mensaje para Alma:* "${rsvp.wishes}"` : "");

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;

    // Open WhatsApp link
    window.open(waUrl, "_blank");
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 5000);
  };

  // Generate Calendar ICS File
  const handleAddToCalendar = () => {
    const title = encodeURIComponent("Mis 15 - Alma");
    const details = encodeURIComponent("Festejo de 15 años de Alma. ¡Te esperamos vestido elegante y con la mejor energía para festejar!");
    const location = encodeURIComponent("Sociedad Italiana, Alfonzo XIII y Av. Ocampo, Villa Angélica");
    const startDate = "20260808T210000";
    const endDate = "20260809T050000";
    
    // Google Calendar Link format
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}&sf=true&output=xml`;
    window.open(gCalUrl, "_blank");
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center select-none selection:bg-gold-light selection:text-gold-dark font-sans" id="invitation-app-root">
      
      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{ backgroundImage: `url(${pastelButterflyBg})` }}
      >
        {/* Soft, ultra-luxurious overlay to harmonize color and ensure readability */}
        <div className="absolute inset-0 bg-white/[0.08] backdrop-blur-[0.5px]"></div>
      </div>
      
      {/* Absolute Header Shimmer Ribbon */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-celeste-dark via-gold-light to-celeste-dark z-20"></div>

      {/* Floating Interactive Butterfly particles representing the golden butterflies requested by Jimena */}
      <ButterflyParticles />

      {/* Dynamic Background Music Player */}
      <MusicPlayer />

      {/* Main Single-column elegant luxury chassis */}
      <main className="relative z-10 w-full max-w-2xl px-4 sm:px-6 py-8 md:py-12 space-y-12">
        
        {/* HERO SECTION / INTRO CARD */}
        <section className="bg-white/70 backdrop-blur-md rounded-3xl p-8 sm:p-12 text-center border border-white shadow-xl flex flex-col items-center relative overflow-hidden" id="hero-wedding-card">
          {/* Aesthetic inner gold layout border */}
          <div className="absolute inset-4 rounded-[20px] border border-gold/15 pointer-events-none"></div>
          <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-gold-light/40 rounded-tl-lg"></div>
          <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-gold-light/40 rounded-tr-lg"></div>
          <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-gold-light/40 rounded-bl-lg"></div>
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-gold-light/40 rounded-br-lg"></div>

          {/* Golden Sparkles Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center border border-gold/40 shadow-md mb-6 relative animate-float-slow"
          >
            <div className="absolute inset-1.5 rounded-full border border-dashed border-gold/25"></div>
            <Sparkles className="w-10 h-10 text-gold-dark filter drop-shadow-[0_2px_4px_rgba(212,175,55,0.4)] animate-pulse" />
          </motion.div>

          <span className="font-serif text-sm tracking-[0.25em] text-gold-dark font-semibold uppercase mb-2">
            Mis XV Años
          </span>

          {/* Alma Cursive Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="font-cursive text-7xl sm:text-8xl text-gold-gradient py-2 font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)]"
            id="alma-name-title"
          >
            Alma
          </motion.h1>

          {/* Gorgeous Golden Gilded illustration of the theme requested by Jimena */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="my-5 relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-gold shadow-xl p-1 bg-white animate-float-slow"
          >
            <div className="absolute inset-1.5 rounded-full border border-dashed border-gold/45 z-10 pointer-events-none"></div>
            <img 
              src={almaPortrait10}
              alt="Alma - Mis Dulces Quince" 
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
            {/* Soft gold wash overlay */}
            <div className="absolute inset-0 bg-yellow-500/5 mix-blend-color"></div>
          </motion.div>

          {/* Dividing golden floral/sparkle motif */}
          <div className="flex items-center justify-center gap-4 my-2 w-full max-w-xs">
            <div className="h-[1px] bg-gradient-to-r from-transparent to-gold/30 flex-1"></div>
            <Sparkles className="w-4 h-4 text-gold" />
            <div className="h-[1px] bg-gradient-to-l from-transparent to-gold/30 flex-1"></div>
          </div>

          {/* Requested Main Quote */}
          <p className="font-serif text-lg sm:text-xl text-slate-700 italic leading-relaxed max-w-md my-4">
            "Hay momentos memorables en los cuales la vida florece de manera excelsa. Tu compañía hará de esta fecha un recuerdo sublime."
          </p>

          <div className="mt-6 flex flex-col items-center">
            <span className="font-sans text-[11px] uppercase tracking-widest text-slate-400 font-semibold mb-2">
              August 8 · 2026
            </span>
            <ChevronDown className="w-5 h-5 text-gold animate-bounce" />
          </div>
        </section>

        {/* COUNTDOWN TIMER SECTION */}
        <section className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white shadow-xl relative" id="countdown-timer-card">
          <div className="absolute inset-4 rounded-[20px] border border-dashed border-celeste-dark/30 pointer-events-none"></div>
          <div className="text-center mb-4">
            <h2 className="font-serif text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">
              Falta muy poco
            </h2>
          </div>
          <Countdown targetDate={targetDate} />
        </section>

        {/* DATE & TIME CARD */}
        <section className="bg-white/70 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white shadow-xl relative text-center flex flex-col items-center" id="date-time-card">
          <div className="absolute inset-4 rounded-[20px] border border-gold/10 pointer-events-none"></div>
          
          <div className="w-14 h-14 bg-sky-50 rounded-full flex items-center justify-center border border-gold/25 mb-4 shadow-sm">
            <Calendar className="w-6 h-6 text-gold-dark" />
          </div>

          <h2 className="font-serif text-2xl font-semibold tracking-wider text-slate-800 uppercase mb-4">
            Cuándo es
          </h2>

          <div className="space-y-2">
            <span className="block font-serif text-3xl font-medium text-gold-dark">
              Sábado 08 de Agosto
            </span>
            <span className="block font-sans text-xl uppercase tracking-widest text-slate-600 font-normal">
              2026
            </span>
            
            {/* Entry time: 21:00 punctual */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-celeste-medium/40 border border-celeste-dark/40 text-slate-700 font-medium font-sans text-sm mt-3 animate-pulse">
              <Clock className="w-4 h-4 text-sky-500" />
              <span>Ingreso: 21:00 hs — Puntual</span>
            </div>
          </div>

          {/* Add to calendar button */}
          <button 
            onClick={handleAddToCalendar}
            className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 active:scale-95 text-white font-sans text-xs font-semibold uppercase tracking-widest py-3 px-6 rounded-full shadow-lg transition-all duration-300 pointer-events-auto"
            id="add-to-calendar-btn"
          >
            <Calendar className="w-4 h-4" />
            <span>Agregar al Calendario</span>
          </button>
        </section>

        {/* PHYSICAL LOCATION CARD */}
        <section className="bg-white/70 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white shadow-xl relative text-center flex flex-col items-center" id="physical-location-card">
          <div className="absolute inset-4 rounded-[20px] border border-gold/10 pointer-events-none"></div>

          <div className="w-14 h-14 bg-sky-50 rounded-full flex items-center justify-center border border-gold/25 mb-4 shadow-sm">
            <MapPin className="w-6 h-6 text-gold-dark" />
          </div>

          <h2 className="font-serif text-2xl font-semibold tracking-wider text-slate-800 uppercase mb-4">
            Dónde festejo
          </h2>

          <div className="space-y-2 max-w-sm">
            {/* Salon Name: Sociedad Italiana */}
            <span className="block font-serif text-3xl font-semibold text-sky-950">
              Sociedad Italiana
            </span>
            
            {/* Calle: Alfonzo XIII y Av. Ocampo */}
            <span className="block font-sans text-sm text-slate-600 tracking-wide">
              Esquina de <strong className="text-slate-800">Alfonzo XIII y Av. Ocampo</strong>,<br />
              Villa Angélica, Pergamino, Buenos Aires.
            </span>
          </div>

          {/* Styled Clean Map Preview Box to mimic top tier custom layouts */}
          <div className="w-full h-44 rounded-2xl border border-sky-200 overflow-hidden relative shadow-inner my-6 group">
            {/* Elegant luxury styled map background using generated asset or stylized landscape */}
            <div className="absolute inset-0 bg-sky-100 flex items-center justify-center flex-col p-4 bg-cover bg-center" style={{ backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-60.575,-33.896,15,0/600x300?access_token=mock')` }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-200/90 via-sky-50/70 to-white/90 z-0"></div>
              
              {/* Detailed custom pins resembling high end interactive templates */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg border border-gold">
                    <MapPin className="w-5 h-5 text-gold-dark" />
                  </div>
                </div>
                <span className="mt-2 bg-slate-900/90 text-white font-sans text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md">
                  Sociedad Italiana
                </span>
                <span className="mt-1 font-sans text-[9px] text-slate-500 font-semibold uppercase">
                  Alfonzo XIII y Av. Ocampo
                </span>
              </div>
            </div>
          </div>

          {/* Google Maps Real Redirection Link */}
          <a
            href="https://maps.app.goo.gl/PR7AUcgiEmDKjAtd7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:scale-95 text-slate-900 font-sans text-xs font-bold uppercase tracking-widest py-3.5 px-8 rounded-full shadow-lg transition-all duration-300 cursor-pointer border-t border-amber-300/30"
            id="google-maps-btn"
          >
            <Map className="w-4 h-4" />
            <span>Cómo Llegar</span>
          </a>
        </section>

        {/* DRESS CODE CARD */}
        <section className="bg-white/70 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white shadow-xl relative text-center flex flex-col items-center" id="dress-code-card">
          <div className="absolute inset-4 rounded-[20px] border border-gold/10 pointer-events-none"></div>

          <div className="w-14 h-14 bg-sky-50 rounded-full flex items-center justify-center border border-gold/25 mb-4 shadow-sm">
            <Wine className="w-6 h-6 text-gold-dark animate-float" />
          </div>

          <h2 className="font-serif text-2xl font-semibold tracking-wider text-slate-800 uppercase mb-3">
            Código de Vestimenta
          </h2>

          <span className="block font-serif text-4xl text-gold-dark font-medium my-2">
            Elegante
          </span>

          <p className="font-sans text-xs text-slate-500 leading-relaxed max-w-sm mt-2">
            Queremos celebrar este momento de la manera más maravillosa. Te invitamos a lucir tu mejor atuendo elegante y formal.
          </p>


        </section>

        {/* DREAMY PHOTO GALLERY COLLECTION */}
        <section className="bg-white/70 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-white shadow-xl relative text-center flex flex-col items-center w-full" id="photo-gallery-card">
          <div className="absolute inset-4 rounded-[20px] border border-gold/15 pointer-events-none"></div>
          
          <div className="w-14 h-14 bg-sky-50 rounded-full flex items-center justify-center border border-gold/25 mb-4 shadow-sm">
            <Sparkles className="w-6 h-6 text-gold-dark animate-pulse" />
          </div>

          <h2 className="font-serif text-2xl font-semibold tracking-wider text-slate-800 uppercase mb-2">
            Mis Recuerdos
          </h2>
          <p className="font-sans text-xs text-slate-500 max-w-sm mb-8 px-2">
            Haz clic en mis fotos para verlas en pantalla completa y compartir este mágico camino a mis quince años.
          </p>

          {/* Grid Layout representing the Polaroid-style dream layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl mt-2 justify-center items-center">
            
            {GALLERY_PHOTOS.map((photo, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.04, rotate: index % 2 === 0 ? 1 : -1, zIndex: 10 }}
                onClick={() => setActivePhoto(photo.src)}
                className={`bg-white p-2.5 pb-4 sm:p-3 sm:pb-6 rounded-lg shadow-md border border-slate-100 hover:shadow-xl transition-shadow duration-300 ${photo.rotation} cursor-pointer relative group pointer-events-auto`}
              >
                <div className="absolute top-2 right-2 w-5 h-5 bg-yellow-500/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-3 h-3 text-gold" />
                </div>
                <div className="aspect-[3/4] overflow-hidden rounded bg-slate-50 relative">
                  <img 
                    src={photo.src} 
                    alt={`Alma - ${photo.title}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-sky-200/5 mix-blend-color"></div>
                </div>
                <div className="mt-2.5 text-center px-1">
                  <span className="font-cursive text-base sm:text-lg text-slate-700 block truncate leading-tight">{photo.title}</span>
                  <span className="font-sans text-[8px] sm:text-[9.5px] uppercase text-gold-dark tracking-widest font-semibold block mt-0.5">{photo.sub}</span>
                </div>
              </motion.div>
            ))}

          </div>
        </section>

        {/* BANK GIFT DETAILS CARD (LLUVIA DE SOBRES) */}
        <section className="bg-gradient-to-tr from-sky-100/50 via-white/80 to-sky-50 rounded-3xl p-8 sm:p-10 border border-white shadow-xl relative text-center flex flex-col items-center overflow-hidden" id="gifts-card">
          {/* Shiny overlay layout */}
          <div className="absolute top-0 right-0 w-28 h-28 bg-gold-light/10 rounded-full blur-2xl"></div>
          <div className="absolute inset-4 rounded-[20px] border border-dashed border-gold/20 pointer-events-none"></div>

          <div className="w-14 h-14 bg-sky-50 rounded-full flex items-center justify-center border border-gold/25 mb-4 shadow-sm">
            <Gift className="w-6 h-6 text-gold-dark" />
          </div>

          <h2 className="font-serif text-2xl font-semibold tracking-wider text-slate-800 uppercase mb-4">
            Lluvia de Sobres
          </h2>

          {/* Requested Quote */}
          <p className="font-serif text-lg text-slate-700 italic leading-relaxed max-w-sm mb-6">
            "Si deseás realizar un obsequio para acompañar mis sueños, podés hacerlo abriendo mi sobre de regalos"
          </p>

          <button 
            onClick={() => setShowGiftModal(!showGiftModal)}
            className="flex items-center gap-2 bg-gradient-to-r from-sky-400 to-celeste-dark hover:from-sky-500 hover:to-sky-500 active:scale-95 text-slate-900 font-sans text-xs font-bold uppercase tracking-widest py-3.5 px-8 rounded-full shadow-lg transition-all duration-300"
            id="show-gift-overlay-btn"
          >
            <span>Ver Datos Bancarios</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showGiftModal ? 'rotate-180' : ''}`} />
          </button>

          {/* Interactive slide-down panel with account details */}
          <AnimatePresence>
            {showGiftModal && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full overflow-hidden mt-6"
              >
                <div className="bg-white/95 border border-sky-100 rounded-2xl p-5 sm:p-6 text-left shadow-md space-y-4 relative">
                  <div className="absolute top-1.5 right-1.5 w-6 h-6 bg-gold-light/30 rounded-full blur-md"></div>
                  
                  <div className="border-b border-sky-100 pb-3 flex justify-between items-center">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-sky-800">
                      Datos de CBU / Alias
                    </span>
                    <span className="font-sans text-[10px] bg-amber-50 text-amber-700 font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-amber-200">
                      Banco Provincia
                    </span>
                  </div>

                  <div className="space-y-3 font-sans text-xs">
                    <div>
                      <span className="block text-slate-400 uppercase tracking-wide text-[10px] mb-0.5">
                        Titular de la Cuenta
                      </span>
                      <span className="font-medium text-slate-800 text-sm">
                        Anabella Montenegro
                      </span>
                    </div>

                    <div className="flex justify-between items-end border-t border-dotted border-slate-200 pt-3">
                      <div>
                        <span className="block text-slate-400 uppercase tracking-wide text-[10px] mb-0.5">
                          Alias
                        </span>
                        <input 
                          type="text" 
                          readOnly 
                          value="Almaleguiza.xv" 
                          className="bg-transparent font-semibold text-slate-900 text-lg focus:outline-none select-all font-mono"
                        />
                      </div>
                      
                      <button 
                        onClick={handleCopyAlias}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all duration-300 text-[10px] font-bold uppercase tracking-wider border pointer-events-auto ${
                          aliasCopied
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-gold-light/20"
                        }`}
                        id="copy-bank-alias-btn"
                      >
                        {aliasCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar Alias</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-celeste-light rounded-xl flex items-start gap-2 border border-celeste-dark/30">
                    <Sparkles className="w-4 h-4 text-sky-600 mt-0.5 flex-shrink-0" />
                    <p className="text-[10px] text-sky-950 font-medium">
                      Una vez enviado el regalo, ¡puedes avisarme a través de la confirmación de asistencia! ¡Muchas gracias por acompañar mis sueños!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* COMPARTIR FOTOS Y VIDEOS ALBUM SECTION */}
        <section className="bg-white/70 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white shadow-xl relative text-center flex flex-col items-center w-full" id="share-memories-card">
          <div className="absolute inset-4 rounded-[20px] border border-gold/10 pointer-events-none"></div>

          <div className="w-14 h-14 bg-sky-50 rounded-full flex items-center justify-center border border-gold/25 mb-4 shadow-sm">
            <Camera className="w-6 h-6 text-gold-dark" />
          </div>

          <h2 className="font-serif text-2xl font-semibold tracking-wider text-slate-800 uppercase mb-2">
            Compartí tus Fotos y Videos
          </h2>
          <p className="font-sans text-xs text-slate-500 max-w-sm mx-auto mb-6">
            ¡Queremos guardar cada instante de esta noche maravillosa! Escaneá el código QR o tocá el botón para agregar tus fotos y videos directamente a nuestro álbum compartido de Google Photos.
          </p>

          <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto relative z-10">
            {/* Elegant QR Code Button wrapper */}
            <a
              href="https://photos.app.goo.gl/w1geSwrmUDk1EbPC9"
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative p-4 bg-white/95 rounded-2xl border border-sky-100 shadow-md hover:shadow-xl hover:border-gold/40 transition-all duration-300 pointer-events-auto"
              id="qr-code-link-btn"
            >
              {/* Subtle shining border on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-400/10 via-gold-light/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="relative bg-slate-50/55 p-3 rounded-xl flex items-center justify-center overflow-hidden border border-slate-100/80">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fphotos.app.goo.gl%2Fw1geSwrmUDk1EbPC9"
                  alt="QR Code Álbum Compartido"
                  className="w-48 h-48 sm:w-52 sm:h-52 object-contain relative z-10 transition-transform duration-305 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Inner overlay hint */}
              <div className="mt-3 text-[11px] font-sans font-bold text-sky-800 flex items-center justify-center gap-1.5 uppercase tracking-widest group-hover:text-gold-dark transition-colors">
                <QrCode className="w-4 h-4" />
                <span>Escanear o Tocar para ingresar</span>
              </div>
            </a>

            {/* Direct Action Button */}
            <a
              href="https://photos.app.goo.gl/w1geSwrmUDk1EbPC9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 active:scale-95 text-white font-sans text-xs font-bold uppercase tracking-widest py-3.5 px-8 rounded-full shadow-lg transition-all duration-300 cursor-pointer pointer-events-auto w-full sm:w-auto justify-center"
              id="upload-button-link"
            >
              <Upload className="w-4 h-4" />
              <span>Ver Álbum / Subir Fotos</span>
            </a>
          </div>
        </section>

        {/* RSVP FORM SECTION (CONFIRMATION FORM) */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-celeste-dark/50 shadow-2xl relative" id="rsvp-card">
          {/* Subtle gold decoration bands */}
          <div className="absolute inset-4 rounded-[20px] border border-gold/15 pointer-events-none"></div>

          <div className="text-center max-w-sm mx-auto mb-8">
            <span className="font-cursive text-3xl text-gold-dark block mb-1">
              Confirmación
            </span>
            <h2 className="font-serif text-3xl font-semibold tracking-wider text-slate-800 uppercase mb-2">
              Asistencia
            </h2>
            <p className="font-sans text-xs text-slate-500">
              Por favor, confirmanos tu presencia lo antes posible para facilitarnos la organización de la fiesta.
            </p>
          </div>

          <form onSubmit={handleSubmitRsvp} className="space-y-4 max-w-md mx-auto text-left relative z-10">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5 pl-1">
                Tu Nombre y Apellido *
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Sol Duran"
                value={rsvp.fullName}
                onChange={(e) => setRsvp({ ...rsvp, fullName: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-sky-100 rounded-xl focus:border-gold focus:ring focus:ring-gold/15 text-sm transition-all pointer-events-auto text-slate-800"
              />
            </div>

            {/* Attendance Toggle */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => setRsvp({ ...rsvp, isAttending: true })}
                className={`py-3 px-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider text-center border transition-all duration-300 pointer-events-auto ${
                  rsvp.isAttending
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                }`}
                id="rsvp-yes-btn"
              >
                ¡Sí, iré feliz!
              </button>

              <button
                type="button"
                onClick={() => setRsvp({ ...rsvp, isAttending: false })}
                className={`py-3 px-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider text-center border transition-all duration-300 pointer-events-auto ${
                  !rsvp.isAttending
                    ? "bg-rose-50 border-rose-300 text-rose-800 shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                }`}
                id="rsvp-no-btn"
              >
                No podré asistir
              </button>
            </div>

            {/* Companions Amount (Visible if attending) */}
            {rsvp.isAttending && (
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5 pl-1">
                  Cantidad de Asistentes *
                </label>
                <select
                  value={rsvp.totalGuests}
                  onChange={(e) => setRsvp({ ...rsvp, totalGuests: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-50 border border-sky-100 rounded-xl focus:border-gold text-sm transition-all pointer-events-auto text-slate-800"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num === 1 ? "Solo Yo (1)" : `${num} personas`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Dietary Restrictions */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5 pl-1">
                ¿Posees alguna restricción alimentaria o menú especial?
              </label>
              <input
                type="text"
                placeholder="Ej: Celíaco, Vegano, Alergia al maní..."
                value={rsvp.dietaryRestrictions}
                onChange={(e) => setRsvp({ ...rsvp, dietaryRestrictions: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-sky-100 rounded-xl focus:border-gold text-sm transition-all pointer-events-auto text-slate-800"
              />
            </div>

            {/* Warm wishes to Alma */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5 pl-1">
                Mensaje de deseos para Alma (Opcional)
              </label>
              <textarea
                rows={3}
                placeholder="¡Escribile unas tiernas palabras a Alma para alegrarle el día!"
                value={rsvp.wishes}
                onChange={(e) => setRsvp({ ...rsvp, wishes: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-sky-100 rounded-xl focus:border-gold text-sm transition-all pointer-events-auto text-slate-800 resize-none"
              />
            </div>

            {/* Submit directly confirming to Mom's WhatsApp line 2477618053 */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-500 hover:from-emerald-500 hover:to-green-600 hover:shadow-lg active:scale-98 text-white font-sans text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 pointer-events-auto"
              id="confirm-rsvp-whatsapp-btn"
            >
              <Send className="w-4 h-4" />
              <span>Confirmar Asistencia por WhatsApp</span>
            </button>
          </form>

          {messageSent && (
            <div className="mt-4 text-center text-xs font-sans text-sky-800 bg-sky-50 py-2.5 px-4 rounded-xl border border-sky-200 animate-pulse">
              🚀 Generando e iniciando el chat de WhatsApp con la mamá de Alma...
            </div>
          )}

          {/* Interactive Wishes Guest Bulletin Board */}
          <div className="mt-8 border-t border-slate-100 pt-6">
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">
              Mensajes de Cariño de los Invitados ✨
            </span>

            <div className="space-y-3 max-h-48 overflow-y-auto pr-1" id="rsvp-wishes-board">
              {rsvpWishes.map((wish, index) => (
                <div key={index} className="bg-sky-50/40 p-3 rounded-xl border border-sky-100/50 relative">
                  <div className="absolute right-3.5 top-3.5 text-gold-light/40">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <p className="font-serif text-xs text-slate-700 italic pr-6 leading-relaxed">
                    "{wish}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center py-6 space-y-4">
          {/* Audio icon cue */}
          <div className="flex justify-center items-center gap-1.5 text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" strokeWidth={2.5} />
            <span>Te esperamos para vivir una noche inolvidable</span>
            <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" strokeWidth={2.5} />
          </div>

          <div className="text-[10px] text-slate-400 font-sans tracking-wide">
            © 2026 Diseñado con amor para Alma Leguiza. Todos los derechos reservados.
          </div>
        </footer>

      </main>

      {/* LIGHTBOX FOR PHOTO ENLARGEMENTS */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Top right escape tip */}
            <div className="absolute top-6 right-6 text-white/50 text-xs uppercase tracking-widest font-sans pointer-events-none">
              Toca para cerrar ×
            </div>
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-lg w-full max-h-[80vh] aspect-[3/4] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={activePhoto} 
                alt="Alma en detalle" 
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border-4 border-white/10"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setActivePhoto(null)}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white text-slate-900 font-bold font-sans flex items-center justify-center shadow-lg hover:bg-slate-100 transition-colors pointer-events-auto cursor-pointer"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
