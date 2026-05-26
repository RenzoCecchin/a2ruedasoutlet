import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../services/apiClient';

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!email || !token) {
        setError('Parámetros inválidos en la URL');
        setLoading(false);
        return;
      }

      try {
        await apiClient.post('/auth/verify-email', { email, token });
        setSuccess(true);

        // Redirigir a login después de 3 segundos
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } catch (err: any) {
        setError(err.message || 'Error verificando email');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [email, token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        {loading && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Verificando email...</h2>
            <p className="text-gray-600">Por favor espera mientras verificamos tu email</p>
          </>
        )}

        {success && !loading && (
          <>
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">¡Email Verificado!</h2>
            <p className="text-gray-600 mb-4">Tu email ha sido verificado exitosamente.</p>
            <p className="text-sm text-gray-500">Redirigiendo a login en unos segundos...</p>
          </>
        )}

        {error && !loading && (
          <>
            <div className="text-red-500 text-5xl mb-4">✗</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Error de Verificación</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
            >
              Volver al Inicio
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
