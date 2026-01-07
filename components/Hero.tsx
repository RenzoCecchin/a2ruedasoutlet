import React from 'react';

const Hero: React.FC = () => {
  const handleScrollToShop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Importante: Prevenir el salto predeterminado del navegador
    e.preventDefault();
    
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      const headerOffset = 80;
      const elementPosition = shopSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-zinc-900">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop" 
          alt="Motorcycle Art" 
          className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-moto-green font-medium tracking-[0.2em] mb-4 uppercase text-sm md:text-base animate-fade-in-up">
          Ingeniería & Estilo
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          Eleva tu Experiencia <br />
          <span className="italic font-light">Sobre Ruedas</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
          Repuestos exclusivos y equipamiento de alta gama para los motociclistas más exigentes de Argentina.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#shop" 
            onClick={handleScrollToShop}
            className="group relative px-8 py-4 bg-moto-black text-white font-bold uppercase tracking-wider overflow-hidden border border-moto-green transition-all hover:bg-moto-green cursor-pointer"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">Explorar Catálogo</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a 
        href="#shop"
        onClick={handleScrollToShop}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hover:animate-none text-white/80 hover:text-white transition-all duration-300 cursor-pointer p-4 z-20"
        aria-label="Ir al catálogo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 drop-shadow-md">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </a>
    </div>
  );
};

export default Hero;