'use client';

import { useState } from 'react';
import Link from 'next/link';
import { loginAction } from '../actions';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const res = await loginAction(formData);

      if (res?.error) {
        setError(res.error);
      }
    } catch (err) {
      console.error('Login submit error:', err);
      setError('Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{ fontSize: '32px' }}>⚡</span>
          <h1 className="login-card__title" style={{ marginTop: '8px' }}>ELECTSUN ADMIN</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Acceso al panel de gestión corporativa
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: '12px 16px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #ef4444',
              color: '#fca5a5',
              borderRadius: '8px',
              fontSize: '0.875rem',
              marginBottom: '20px',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Usuario
            </label>
            <input
              className="form-input"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              placeholder="Introduce tu usuario"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Contraseña
            </label>
            <input
              className="form-input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="Introduce tu contraseña"
            />
          </div>

          <button
            className="btn btn--primary"
            style={{ width: '100%', marginTop: '20px' }}
            type="submit"
            disabled={loading}
          >
            {loading ? 'ACCEDIENDO...' : 'INICIAR SESIÓN'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link
            href="/"
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            ← Volver a Electsun.es
          </Link>
        </div>
      </div>
    </div>
  );
}
