import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';

type CheckoutStep = 'shipping' | 'payment' | 'processing' | 'success';
type PaymentMethod = 'transfer' | 'mercadopago' | 'cash';

const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, closeCheckout, cartTotal, items, clearCart } = useCart();
  const { decrementStock } = useProducts();
  const { user } = useAuth();
  
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('transfer');
  
  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    phone: '',
    email: '',
    notes: ''
  });

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user && isCheckoutOpen) {
      setFormData(prev => ({ 
          ...prev, 
          name: user.name, 
          email: user.email 
      }));
    }
  }, [user, isCheckoutOpen]);

  // Reset step when opening
  useEffect(() => {
    if (isCheckoutOpen) {
      setStep('shipping');
    }
  }, [isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const generateWhatsAppOrder = () => {
    const orderNumber = Math.floor(Math.random() * 100000) + 10000; // 5 digit order ID
    
    // Build Item List with ID explicitly included
    const itemList = items.map(i => {
        const colorPart = i.selectedColor ? ` (Color: ${i.selectedColor})` : '';
        // Added [ID: ${i.id}] to the message format
        return `• [ID: ${i.id}] ${i.quantity}x ${i.name}${colorPart} - $${(i.price * i.quantity).toLocaleString('es-AR')}`;
    }).join('%0A');
    
    // Determine Payment Text
    let methodText = '';
    switch (paymentMethod) {
        case 'transfer': methodText = '🏦 Transferencia Bancaria (Envío comprobante)'; break;
        case 'mercadopago': methodText = '💳 Tarjeta / Mercado Pago (Solicito Link)'; break;
        case 'cash': methodText = '💵 Efectivo / A convenir'; break;
    }

    // Build Final Message
    // Changed greeting as requested to: ¡HOLA! A2RUEDASOUTLET
    const text = `*¡HOLA! A2RUEDASOUTLET* 🏍️%0A%0A🆔 *Orden:* #${orderNumber}%0A%0A🛒 *RESUMEN DEL PEDIDO:*%0A${itemList}%0A%0A💰 *TOTAL FINAL:* $${cartTotal.toLocaleString('es-AR')}%0A%0A👤 *MIS DATOS:*%0A*Nombre:* ${formData.name}%0A*Dirección:* ${formData.address}, ${formData.city} (CP: ${formData.zip})%0A*Tel:* ${formData.phone}%0A%0A💳 *FORMA DE PAGO ELEGIDA:*%0A${methodText}%0A%0A${formData.notes ? `📝 *Nota:* ${formData.notes}%0A` : ''}%0A¿Me confirman stock y coordinamos el envío?`;

    // Decrement stock from inventory (Local State)
    // This ensures the stock goes down immediately in the app
    decrementStock(items.map(i => ({ id: i.id, quantity: i.quantity })));

    // WhatsApp Number
    const phoneNumber = '5493513484648'; 
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
    
    // Close modal and clear cart after a delay to allow user to return
    setTimeout(() => {
        closeCheckout();
        clearCart();
    }, 1000);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulate Processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={step !== 'processing' ? closeCheckout : undefined}></div>

      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-moto-black text-white p-6 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="font-logo text-xl flex items-center gap-2">
                FINALIZAR COMPRA
            </h2>
            <p className="text-xs text-gray-400">
               {step === 'shipping' && 'Paso 1: Datos de Envío'}
               {step === 'payment' && 'Paso 2: Forma de Pago'}
               {step === 'processing' && 'Generando pedido...'}
               {step === 'success' && '¡Todo listo!'}
            </p>
          </div>
          {step !== 'processing' && step !== 'success' && (
             <button onClick={closeCheckout} className="p-2 hover:bg-white/10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
             </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50">
          
          {/* STEP 1: SHIPPING */}
          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nombre Completo</label>
                  <input
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-moto-green focus:ring-1 focus:ring-moto-green outline-none bg-white transition-all"
                    placeholder="Tu nombre y apellido"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Dirección de Entrega</label>
                  <input
                    name="address"
                    required
                    placeholder="Calle, Número, Piso, Dpto"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-moto-green focus:ring-1 focus:ring-moto-green outline-none bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Ciudad / Localidad</label>
                  <input
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-moto-green focus:ring-1 focus:ring-moto-green outline-none bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Código Postal</label>
                  <input
                    name="zip"
                    required
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-moto-green focus:ring-1 focus:ring-moto-green outline-none bg-white transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">WhatsApp / Teléfono</label>
                  <input
                    name="phone"
                    required
                    type="tel"
                    placeholder="Ej: 351 123 4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-moto-green focus:ring-1 focus:ring-moto-green outline-none bg-white transition-all"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Te contactaremos a este número para coordinar.</p>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Notas del pedido (Opcional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Aclaraciones sobre el envío, horarios, etc."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-moto-green focus:ring-1 focus:ring-moto-green outline-none bg-white transition-all resize-none h-20"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                 <div className="text-sm text-gray-600">
                   Subtotal: <span className="font-bold text-lg text-moto-black">${cartTotal.toLocaleString('es-AR')}</span>
                 </div>
                 <button type="submit" className="bg-moto-black hover:bg-moto-green text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider transition-colors shadow-lg">
                    Siguiente Paso
                 </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 gap-4">
                
                {/* Option 1: Transfer */}
                <label 
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                    paymentMethod === 'transfer' ? 'border-moto-green bg-green-50/50' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    className="mt-1 accent-moto-green"
                    checked={paymentMethod === 'transfer'} 
                    onChange={() => setPaymentMethod('transfer')}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-gray-900">Transferencia Bancaria</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Abone directamente a nuestra cuenta CBU/CVU.</p>
                    
                    {paymentMethod === 'transfer' && (
                        <div className="mt-3 p-3 bg-white rounded border border-gray-200 text-xs font-mono text-gray-600 animate-fade-in">
                            <p>CVU: 0000003100091642563998</p>
                            <p>Alias: A2RUEDAS</p>
                            <p>Titular: Micaela Eliana Andino</p>
                            <p className="mt-2 text-moto-green font-sans font-bold">⚠️ Enviar comprobante al finalizar</p>
                        </div>
                    )}
                  </div>
                </label>

                {/* Option 2: Mercado Pago / Cards */}
                <label 
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                    paymentMethod === 'mercadopago' ? 'border-moto-green bg-green-50/50' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    className="mt-1 accent-moto-green"
                    checked={paymentMethod === 'mercadopago'} 
                    onChange={() => setPaymentMethod('mercadopago')}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">Tarjeta / Mercado Pago</span>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-500">
                            <path d="M16.036 12.364a3.818 3.818 0 00-3.636-2.546H8.727v6.182h2.546v-2.182h1.09a3.818 3.818 0 003.673-1.454zM12.364 14.91h-1.09v-3.273h1.09a1.636 1.636 0 110 3.273z"/>
                            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8-8 8z"/>
                        </svg>
                    </div>
                    <p className="text-xs text-gray-500">Paga con tarjeta de crédito/débito o dinero en cuenta.</p>
                    {paymentMethod === 'mercadopago' && (
                        <div className="mt-2 text-xs text-blue-600 bg-blue-50 p-2 rounded animate-fade-in">
                            ℹ️ Te enviaremos un <strong>Link de Pago Seguro</strong> a tu WhatsApp al confirmar el pedido.
                        </div>
                    )}
                  </div>
                </label>

                {/* Option 3: Cash / Other */}
                <label 
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                    paymentMethod === 'cash' ? 'border-moto-green bg-green-50/50' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    className="mt-1 accent-moto-green"
                    checked={paymentMethod === 'cash'} 
                    onChange={() => setPaymentMethod('cash')}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">A convenir / Efectivo</span>
                    </div>
                    <p className="text-xs text-gray-500">Coordinar pago al retirar o contra entrega (si está disponible).</p>
                  </div>
                </label>

              </div>

              <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                 <button type="button" onClick={() => setStep('shipping')} className="text-gray-500 hover:text-black text-sm font-bold flex items-center gap-1">
                    ← Volver
                 </button>
                 <button type="submit" className="bg-moto-black hover:bg-moto-green text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2">
                    Confirmar Pedido
                    <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-mono">${cartTotal.toLocaleString('es-AR')}</span>
                 </button>
              </div>
            </form>
          )}

          {/* STEP 3: PROCESSING */}
          {step === 'processing' && (
             <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-moto-green rounded-full animate-spin mb-6"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Procesando tu pedido...</h3>
                <p className="text-gray-500 text-sm">Preparando detalles para WhatsApp.</p>
             </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 'success' && (
             <div className="flex flex-col items-center justify-center text-center animate-fade-in py-8">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-moto-green">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                   </svg>
                </div>
                <h2 className="text-3xl font-logo text-moto-black mb-2">¡CASI LISTO!</h2>
                <p className="text-gray-600 max-w-sm mb-8 text-sm">
                  Tu orden ha sido generada correctamente. Para finalizar, envía el detalle a nuestro equipo de ventas por WhatsApp.
                </p>
                
                <button 
                  onClick={generateWhatsAppOrder}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold uppercase tracking-wider transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 mb-4 animate-pulse"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.516-.173-.009-.371-.009-.57-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  Finalizar en WhatsApp
                </button>
                <p className="text-xs text-gray-400">
                    Se abrirá WhatsApp Web o la App en tu dispositivo.
                </p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;