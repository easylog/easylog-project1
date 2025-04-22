import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

export default function ChangeBoard() {
  const router = useRouter();
  const { kunde } = router.query;
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [changes, setChanges] = useState([]);
  const [newChange, setNewChange] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending'
  });

  useEffect(() => {
    // Überprüfen, ob der Benutzer angemeldet ist
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!storedUser || !token) {
      router.push('/auth/login');
      return;
    }

    try {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      // Hier würden wir normalerweise Daten vom Server abrufen
      // Für dieses Beispiel verwenden wir Dummy-Daten
      setTimeout(() => {
        const dummyCustomers = ['Kunde A', 'Kunde B', 'Kunde C'];
        setCustomers(dummyCustomers);
        
        // Dummy-Änderungen für den ausgewählten Kunden
        const dummyChanges = [
          {
            id: 1,
            title: 'Server-Update durchführen',
            description: 'Update der Server-Software auf die neueste Version. Wartungsfenster erforderlich.',
            priority: 'high',
            status: 'in-progress',
            assignedTo: 'Mitarbeiter',
            createdAt: '20.04.2025',
            dueDate: '25.04.2025'
          },
          {
            id: 2,
            title: 'Backup-System konfigurieren',
            description: 'Einrichtung eines automatisierten Backup-Systems mit täglichen Sicherungen.',
            priority: 'medium',
            status: 'pending',
            assignedTo: 'Administrator',
            createdAt: '19.04.2025',
            dueDate: '28.04.2025'
          },
          {
            id: 3,
            title: 'Dokumentation aktualisieren',
            description: 'Aktualisierung der Systemdokumentation nach den letzten Änderungen.',
            priority: 'low',
            status: 'not-started',
            assignedTo: 'Mitarbeiter',
            createdAt: '18.04.2025',
            dueDate: '30.04.2025'
          }
        ];
        
        setChanges(dummyChanges);
        setLoading(false);
      }, 500);
      
    } catch (error) {
      console.error('Fehler beim Laden des Benutzerprofils:', error);
      router.push('/auth/login');
    }
  }, [router, kunde]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewChange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validierung
    if (!newChange.title || !newChange.description) {
      alert('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }
    
    // In einer echten Anwendung würde hier ein API-Aufruf erfolgen
    try {
      // Simulierter API-Aufruf
      // await axios.post(`/api/changeboard/${kunde}`, newChange);
      
      // Optimistische UI-Aktualisierung
      const newChangeEntry = {
        id: Date.now(),
        ...newChange,
        assignedTo: user?.name || 'Benutzer',
        createdAt: new Date().toLocaleDateString('de-DE'),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('de-DE')
      };
      
      setChanges([newChangeEntry, ...changes]);
      
      // Formular zurücksetzen
      setNewChange({
        title: '',
        description: '',
        priority: 'medium',
        status: 'pending'
      });
      
    } catch (error) {
      console.error('Fehler beim Speichern der Änderung:', error);
      alert('Fehler beim Speichern der Änderung. Bitte versuchen Sie es erneut.');
    }
  };

  const handleCustomerChange = (selectedCustomer) => {
    router.push(`/changeboard/${selectedCustomer}`);
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <span className="badge bg-danger">Hoch</span>;
      case 'medium':
        return <span className="badge bg-warning text-dark">Mittel</span>;
      case 'low':
        return <span className="badge bg-info">Niedrig</span>;
      default:
        return <span className="badge bg-secondary">Unbekannt</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="badge bg-success">Abgeschlossen</span>;
      case 'in-progress':
        return <span className="badge bg-warning text-dark">In Bearbeitung</span>;
      case 'pending':
        return <span className="badge bg-primary">Ausstehend</span>;
      case 'not-started':
        return <span className="badge bg-secondary">Nicht begonnen</span>;
      default:
        return <span className="badge bg-secondary">Unbekannt</span>;
    }
  };

  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Wird geladen...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <Head>
        <title>ChangeBoard: {kunde} | EasyLog</title>
        <meta name="description" content={`ChangeBoard für ${kunde}`} />
      </Head>

      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 d-md-block sidebar collapse bg-dark">
          <div className="position-sticky pt-3">
            <div className="px-3 py-4 text-white">
              <h5>EasyLog</h5>
              <p className="mb-0">{user?.role === 'admin' ? 'Admin' : 'Mitarbeiter'}</p>
            </div>
            <hr className="text-white" />
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link href={user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/staff'} className="nav-link sidebar-link px-3 py-2">
                  <i className="bi bi-speedometer2 me-2"></i>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/journal" className="nav-link sidebar-link px-3 py-2">
                  <i className="bi bi-journal-text me-2"></i>
                  Journal
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/changeboard/Kunde A" className="nav-link sidebar-link active px-3 py-2">
                  <i className="bi bi-kanban me-2"></i>
                  ChangeBoard
                </Link>
              </li>
              <li className="nav-item mt-5">
                <button onClick={handleLogout} className="nav-link sidebar-link px-3 py-2 text-danger border-0 bg-transparent w-100 text-start">
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Abmelden
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Hauptinhalt */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">ChangeBoard: {kunde}</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <button type="button" className="btn btn-sm btn-outline-secondary">Exportieren</button>
                <button type="button" className="btn btn-sm btn-outline-secondary">Drucken</button>
              </div>
              <select 
                className="form-select form-select-sm" 
                value={kunde || ''}
                onChange={(e) => handleCustomerChange(e.target.value)}
              >
                <option value="" disabled>Kunde auswählen</option>
                {customers.map((customer, index) => (
                  <option key={index} value={customer}>{customer}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Neue Änderung */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="card-title mb-0">Neue Änderung hinzufügen</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="title" className="form-label">Titel</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="title" 
                          name="title"
                          value={newChange.title}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="priority" className="form-label">Priorität</label>
                        <select 
                          className="form-select" 
                          id="priority" 
                          name="priority"
                          value={newChange.priority}
                          onChange={handleInputChange}
                        >
                          <option value="high">Hoch</option>
                          <option value="medium">Mittel</option>
                          <option value="low">Niedrig</option>
                        </select>
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select 
                          className="form-select" 
                          id="status" 
                          name="status"
                          value={newChange.status}
                          onChange={handleInputChange}
                        >
                          <option value="not-started">Nicht begonnen</option>
                          <option value="pending">Ausstehend</option>
                          <option value="in-progress">In Bearbeitung</option>
                          <option value="completed">Abgeschlossen</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Beschreibung</label>
                      <textarea 
                        className="form-control" 
                        id="description" 
                        name="description"
                        rows="3"
                        value={newChange.description}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      <i className="bi bi-plus-circle me-2"></i>
                      Änderung hinzufügen
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Änderungsliste */}
          <div className="row">
            <div className="col-12 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Änderungen für {kunde}</h5>
                  <div className="input-group" style={{ maxWidth: '300px' }}>
                    <input type="text" className="form-control" placeholder="Änderungen durchsuchen..." />
                    <button className="btn btn-outline-secondary" type="button">
                      <i className="bi bi-search"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  {changes.length === 0 ? (
                    <p className="text-center text-muted my-5">Keine Änderungen vorhanden.</p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Priorität</th>
                            <th scope="col">Titel</th>
                            <th scope="col">Status</th>
                            <th scope="col">Zugewiesen an</th>
                            <th scope="col">Erstellt am</th>
                            <th scope="col">Fällig am</th>
                            <th scope="col">Aktionen</th>
                          </tr>
                        </thead>
                        <tbody>
                          {changes.map(change => (
                            <tr key={change.id}>
                              <td>{getPriorityBadge(change.priority)}</td>
                              <td>{change.title}</td>
                              <td>{getStatusBadge(change.status)}</td>
                              <td>{change.assignedTo}</td>
                              <td>{change.createdAt}</td>
                              <td>{change.dueDate}</td>
                              <td>
                                <div className="btn-group">
                                  <button className="btn btn-sm btn-outline-primary">
                                    <i className="bi bi-pencil"></i>
                                  </button>
                                  <button className="btn btn-sm btn-outline-success">
                                    <i className="bi bi-check-lg"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="pt-5 d-flex justify-content-between">
            <span>Copyright © 2025 EasyLog</span>
            <ul className="nav m-0">
              <li className="nav-item">
                <a className="nav-link text-secondary" href="#">Datenschutz</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary" href="#">Impressum</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary" href="#">Kontakt</a>
              </li>
            </ul>
          </footer>
        </main>
      </div>
    </div>
  );
}
