import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

type AuthView = 'login' | 'register' | 'forgot';
type ForgotStep = 'email' | 'reset';

const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, register, recoverPassword, resetPassword } = useAuth();
  const [view, setView] = useState<AuthView>('login');
  
  // Forgot Password Steps
  const [forgotStep, setForgotStep] = useState<ForgotStep>('email');

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Reset Password Specific States
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isAuthModalOpen) {
      resetState();
    }
  }, [isAuthModalOpen]);

  const resetState = () => {
    setView('login');
    setForgotStep('email');
    setError('');
    setSuccessMsg('');
    setName('');
    setEmail('');
    setPassword('');
    setResetCode('');
    setNewPassword('');
  };

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      if (view === 'login') {
        await login(email, password);
      } else if (view === 'register') {
        await register(name, email, password);
      } else if (view === 'forgot') {
        if (forgotStep === 'email') {
          // Step 1: Request Code
          await recoverPassword(email);
          setForgotStep('reset'); // Move to step 2
          setSuccessMsg('Código enviado. Revisa la consola del servidor (negra).');
        } else {
          // Step 2: Verify Code & Reset
          await resetPassword(email, resetCode, newPassword);
          setSuccessMsg('¡Contraseña restablecida con éxito! Inicia sesión.');
          // Delay to switch to login view automatically
          setTimeout(() => {
             setView('login');
             setSuccessMsg('');
             setPassword('');
          }, 2000);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error');
    } finally {
      setIsLoading(false);
    }
  };

  const switchView = (newView: AuthView) => {
    setView(newView);
    setError('');
    setSuccessMsg('');
    setForgotStep('email'); // Reset forgot flow
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeAuthModal}
      ></div>

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Header Tabs (Hidden in forgot mode) */}
        {view !== 'forgot' && (
          <div className="flex text-center border-b border-gray-100">
            <button 
              onClick={() => switchView('login')}
              className={`flex-1 py-4 font-bold tracking-wider text-sm uppercase transition-colors ${
                view === 'login' ? 'bg-moto-black text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              Iniciar Sesión
            </button>
            <button 
              onClick={() => switchView('register')}
              className={`flex-1 py-4 font-bold tracking-wider text-sm uppercase transition-colors ${
                view === 'register' ? 'bg-moto-black text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              Registrarse
            </button>
          </div>
        )}

        {/* Forgot Password Header */}
        {view === 'forgot' && (
          <div className="bg-moto-black text-white p-4 flex items-center">
            <button 
              onClick={() => switchView('login')}
              className="p-2 hover:bg-white/10 rounded-full transition-colors mr-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
            <span className="font-bold text-sm tracking-wider uppercase">Recuperar Contraseña</span>
          </div>
        )}

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="font-logo text-3xl text-moto-black mb-2">
              A2RUEDAS<span className="text-moto-green">OUTLET</span>
            </h2>
            <p className="text-gray-500 text-sm">
              {view === 'login' && 'Bienvenido de nuevo, piloto.'}
              {view === 'register' && 'Únete a la comunidad.'}
              {view === 'forgot' && forgotStep === 'email' && 'Ingresa tu email para recibir el código.'}
              {view === 'forgot' && forgotStep === 'reset' && 'Ingresa el código y tu nueva contraseña.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* NAME FIELD (REGISTER) */}
            {view === 'register' && (
              <div className="animate-fade-in">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-moto-green focus:ring-1 focus:ring-moto-green outline-none bg-gray-50"
                  placeholder="Ej. Juan Pérez"
                />
              </div>
            )}
            
            {/* EMAIL FIELD (LOGIN, REGISTER, FORGOT STEP 1) */}
            {(view !== 'forgot' || (view === 'forgot' && forgotStep === 'email')) && (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={view === 'forgot' && forgotStep === 'reset'} 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-moto-green focus:ring-1 focus:ring-moto-green outline-none bg-gray-50 disabled:bg-gray-100"
                  placeholder="tu@email.com"
                />
              </div>
            )}

            {/* PASSWORD FIELD (LOGIN, REGISTER) */}
            {view !== 'forgot' && (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase">Contraseña</label>
                  {view === 'login' && (
                    <button 
                      type="button"
                      onClick={() => switchView('forgot')}
                      className="text-xs text-moto-green hover:underline font-medium"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-moto-green focus:ring-1 focus:ring-moto-green outline-none bg-gray-50"
                  placeholder="••••••••"
                />
              </div>
            )}

            {/* FORGOT PASSWORD STEP 2: CODE & NEW PASSWORD */}
            {view === 'forgot' && forgotStep === 'reset' && (
                <div className="animate-fade-in space-y-4">
                    <div className="p-3 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100">
                        Código enviado a <strong>{email}</strong>. Revisa la consola del servidor.
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Código de Recuperación</label>
                        <input
                            type="text"
                            required
                            value={resetCode}
                            onChange={(e) => setResetCode(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-moto-green focus:ring-1 focus:ring-moto-green outline-none bg-gray-50 text-center tracking-widest font-bold"
                            placeholder="123456"
                            maxLength={6}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nueva Contraseña</label>
                        <input
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-moto-green focus:ring-1 focus:ring-moto-green outline-none bg-gray-50"
                            placeholder="Nueva contraseña"
                        />
                    </div>
                </div>
            )}

            {/* MESSAGES */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg flex items-center gap-2 animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {error}
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-green-50 border border-green-100 text-green-700 text-sm rounded-lg flex items-center gap-2 animate-fade-in">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 {successMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-moto-green hover:bg-moto-greenDark text-white font-bold py-4 rounded-xl uppercase tracking-wider shadow-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isLoading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
              
              {!isLoading && (
                <>
                  {view === 'login' && 'Ingresar'}
                  {view === 'register' && 'Crear Cuenta'}
                  {view === 'forgot' && forgotStep === 'email' && 'Enviar Código'}
                  {view === 'forgot' && forgotStep === 'reset' && 'Restablecer Contraseña'}
                  
                  {!(view === 'forgot' && forgotStep === 'reset') && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  )}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;