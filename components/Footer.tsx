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
            <h4 className="text-lg font-bold mb-6 text-white">Contacto</h4>
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