import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/login', formData);
      
      // Token im localStorage speichern
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Weiterleitung basierend auf der Rolle
      if (response.data.user.role === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/staff');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Anmeldung fehlgeschlagen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Anmelden | EasyLog</title>
        <meta name="description" content="Anmelden bei EasyLog" />
      </Head>

      <div className="row justify-content-center min-vh-100 align-items-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h1 className="h3">EasyLog</h1>
                <p className="text-muted">Bitte melden Sie sich an</p>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">E-Mail</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Passwort</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={loading}
                  >
                    {loading ? 'Wird angemeldet...' : 'Anmelden'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
