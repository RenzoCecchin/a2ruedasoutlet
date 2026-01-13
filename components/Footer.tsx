import React from 'react';

const Footer: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-moto-black text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
                <h2 className="font-logo text-3xl text-white">
                  A2RUEDAS<span className="text-moto-green">OUTLET</span>
                </h2>
            </div>
            <p className="text-gray-400 max-w-sm mb-6 font-light">
              Elevando el estándar en repuestos y equipamiento para motos en Argentina. 
              Especialistas en brindarte seguridad y estilo en cada kilómetro.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Navegación</h4>
            <ul className="space-y-3 text-gray-400 font-light">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleScroll(e, 'top')} 
                  className="hover:text-moto-green transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a 
                  href="#shop" 
                  onClick={(e) => handleScroll(e, 'shop')} 
                  className="hover:text-moto-green transition-colors"
                >
                  Catálogo
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => handleScroll(e, 'contact')}
                  className="hover:text-moto-green transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div id="contact">
            <h4 className="text-lg font-bold mb-6 text-white">Contacto Tienda</h4>
            <ul className="space-y-3 text-gray-400 font-light">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-moto-green rounded-full mr-3"></span>
                Córdoba capital, Argentina
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-moto-green rounded-full mr-3"></span>
                ventas@a2ruedasoutlet.com.ar
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-moto-green rounded-full mr-3"></span>
                +54 9 351 348-4648
              </li>
            </ul>
          </div>
        </div>

        {/* Developer Contact Section */}
        <div className="border-t border-gray-800 py-8">
            <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-gray-500 text-xs font-bold tracking-widest uppercase">Desarrollo Web & Soporte</p>
                <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-gray-400">
                    
                    {/* Instagram */}
                    <a href="https://instagram.com/Renzo.webdev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-moto-green transition-colors group bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800 hover:border-moto-green/50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.232-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                        </svg>
                        Renzo.webdev
                    </a>

                    {/* Email */}
                    <a href="mailto:Renzoi2405@gmail.com" className="flex items-center gap-2 hover:text-moto-green transition-colors group bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800 hover:border-moto-green/50">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        Renzoi2405@gmail.com
                    </a>

                    {/* Phone */}
                    <a href="https://wa.me/543518182383" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-moto-green transition-colors group bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800 hover:border-moto-green/50">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        +54 351 818 2383
                    </a>
                </div>
            </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} A2RUEDASOUTLET. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-moto-green transition-colors">Privacidad</a>
            <a href="#" className="hover:text-moto-green transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;