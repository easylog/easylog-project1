import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Journal() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [journalEntries, setJournalEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [gptSuggestion, setGptSuggestion] = useState('');

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
        setJournalEntries([
          {
            id: 1,
            date: '22.04.2025',
            author: 'Administrator',
            content: 'Heute wurden die Server-Updates für Kunde A erfolgreich abgeschlossen. Alle Systeme laufen stabil.'
          },
          {
            id: 2,
            date: '21.04.2025',
            author: 'Mitarbeiter',
            content: 'Backup-System für Kunde B wurde konfiguriert und getestet. Erste Sicherung wurde erfolgreich durchgeführt.'
          },
          {
            id: 3,
            date: '20.04.2025',
            author: 'Administrator',
            content: 'Neuer Kunde C wurde ins System aufgenommen. Initiale Bestandsaufnahme der IT-Infrastruktur wurde durchgeführt.'
          }
        ]);
        setLoading(false);
      }, 500);
      
    } catch (error) {
      console.error('Fehler beim Laden des Benutzerprofils:', error);
      router.push('/auth/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  const handleNewEntryChange = (e) => {
    setNewEntry(e.target.value);
    
    // Simulierte GPT-Vorschläge basierend auf dem Eingabetext
    if (e.target.value.length > 10) {
      // In einer echten Anwendung würde hier ein API-Aufruf an einen GPT-Dienst erfolgen
      setTimeout(() => {
        setGptSuggestion(
          e.target.value.includes('Server') 
            ? 'Möchten Sie Details zu den Server-Spezifikationen oder durchgeführten Updates hinzufügen?'
            : e.target.value.includes('Kunde') 
              ? 'Vergessen Sie nicht, relevante Kontaktpersonen und Ticketnummern zu erwähnen.'
              : 'Tipp: Fügen Sie konkrete Zeitangaben und beteiligte Personen hinzu, um den Eintrag nachvollziehbarer zu machen.'
        );
      }, 300);
    } else {
      setGptSuggestion('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEntry.trim() === '') return;

    // In einer echten Anwendung würde hier ein API-Aufruf erfolgen
    const newJournalEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('de-DE'),
      author: user?.name || 'Benutzer',
      content: newEntry
    };

    setJournalEntries([newJournalEntry, ...journalEntries]);
    setNewEntry('');
    setGptSuggestion('');
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
        <title>Journal | EasyLog</title>
        <meta name="description" content="Journal für EasyLog" />
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
                <Link href="/journal" className="nav-link sidebar-link active px-3 py-2">
                  <i className="bi bi-journal-text me-2"></i>
                  Journal
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/changeboard/Kunde A" className="nav-link sidebar-link px-3 py-2">
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
            <h1 className="h2">Journal</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <button type="button" className="btn btn-sm btn-outline-secondary">Exportieren</button>
                <button type="button" className="btn btn-sm btn-outline-secondary">Drucken</button>
              </div>
            </div>
          </div>

          {/* Neuer Journal-Eintrag */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="card-title mb-0">Neuer Journal-Eintrag</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <textarea 
                        className="form-control" 
                        rows="4" 
                        placeholder="Beschreiben Sie Ihre Aktivitäten, Beobachtungen oder wichtige Ereignisse..."
                        value={newEntry}
                        onChange={handleNewEntryChange}
                        required
                      ></textarea>
                    </div>
                    
                    {gptSuggestion && (
                      <div className="alert alert-info" role="alert">
                        <i className="bi bi-robot me-2"></i>
                        <strong>GPT-Vorschlag:</strong> {gptSuggestion}
                      </div>
                    )}
                    
                    <button type="submit" className="btn btn-primary">
                      <i className="bi bi-plus-circle me-2"></i>
                      Eintrag hinzufügen
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Journal-Einträge */}
          <div className="row">
            <div className="col-12 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Journal-Einträge</h5>
                  <div className="input-group" style={{ maxWidth: '300px' }}>
                    <input type="text" className="form-control" placeholder="Einträge durchsuchen..." />
                    <button className="btn btn-outline-secondary" type="button">
                      <i className="bi bi-search"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  {journalEntries.length === 0 ? (
                    <p className="text-center text-muted my-5">Keine Journal-Einträge vorhanden.</p>
                  ) : (
                    journalEntries.map(entry => (
                      <div key={entry.id} className="journal-entry mb-4 pb-3 border-bottom">
                        <div className="d-flex justify-content-between mb-2">
                          <h6 className="fw-bold">{entry.author}</h6>
                          <span className="text-muted small">{entry.date}</span>
                        </div>
                        <p className="mb-0">{entry.content}</p>
                      </div>
                    ))
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
