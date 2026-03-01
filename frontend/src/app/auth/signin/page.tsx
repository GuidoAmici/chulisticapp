'use client';

import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";
import styles from "./signin.module.css";

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>✨</div>
          <h1>Chulistic</h1>
          <p>Tu Segundo Cerebro Inteligente</p>
        </div>

        <div className={styles.section}>
          <h2>Bienvenida de nuevo ⚡</h2>
          <p className={styles.description}>
            Accede para organizar tus ideas, tareas y proyectos con la ayuda de Gemini.
          </p>
          <button 
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className={styles.googleBtn}
          >
            <LogIn size={20} />
            Entrar con Google
          </button>
        </div>
      </div>
    </div>
  );
}
