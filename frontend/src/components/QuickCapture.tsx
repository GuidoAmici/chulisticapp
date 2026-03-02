'use client';

import { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { useSession } from 'next-auth/react';
import styles from './QuickCapture.module.css';

interface QuickCaptureProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickCapture({ isOpen, onClose }: QuickCaptureProps) {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const accessToken = (session as any)?.accessToken;
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      
      if (!backendUrl) {
        throw new Error('Configuración de servidor faltante (NEXT_PUBLIC_BACKEND_URL)');
      }

      console.log('Sending capture to:', `${backendUrl}/ai/refine`);
      
      const aiRes = await fetch(`${backendUrl}/ai/refine`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-gemini-token': accessToken || ''
        },
        body: JSON.stringify({ input })
      });
      
      if (!aiRes.ok) {
        const errData = await aiRes.json().catch(() => ({}));
        throw new Error(errData.error || 'Error en el procesamiento de IA');
      }
      
      setInput('');
      onClose();
      window.location.reload();

    } catch (err: any) {
      console.error('Quick Capture Error:', err);
      setError(err.message || 'Ocurrió un error inesperado');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <header className={styles.header}>
          <h2>Captura Rápida ⚡</h2>
          <button onClick={onClose} className={styles.closeBtn}><X size={20} /></button>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputWrapper}>
            <input
              autoFocus
              type="text"
              placeholder="¿Qué tienes en mente? Gemini se encarga del resto..."
              className={styles.mainInput}
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={isProcessing}
            />
            <button 
              type="submit" 
              className={styles.submitBtn} 
              disabled={isProcessing || !input.trim()}
            >
              {isProcessing ? (
                <Sparkles size={20} className={styles.spinning} />
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
          <p className={styles.hint}>
            Escribe una tarea, idea o contacto. Gemini lo clasificará automáticamente.
          </p>
          {error && <p className={styles.errorMessage}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
