import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Komponente für das Staff-Dashboard
export default function StaffDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    assignedCustomers: 0,
    pendingChanges: 0,
    completedChanges: 0
  });
  const [loading, setLoading] = useState(true);

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
        setStats({
          assignedCustomers: 2,
          pendingChanges: 5,
          completedChanges: 3
        });
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
        <title>Mitarbeiter Dashboard | EasyLog</title>
        <meta name="description" content="Mitarbeiter Dashboard für EasyLog" />
      </Head>

      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 d-md-block sidebar collapse bg-dark">
          <div className="position-sticky pt-3">
            <div className="px-3 py-4 text-white">
              <h5>EasyLog</h5>
              <p className="mb-0">Mitarbeiter Dashboard</p>
            </div>
            <hr className="text-white" />
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link href="/dashboard/staff" className="nav-link sidebar-link active px-3 py-2">
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
            <h1 className="h2">Mitarbeiter Dashboard</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <button type="button" className="btn btn-sm btn-outline-secondary">Meine Aufgaben</button>
              </div>
            </div>
          </div>

          {/* Willkommensnachricht */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="alert alert-info" role="alert">
                <h4 className="alert-heading">Willkommen zurück, {user?.name || 'Mitarbeiter'}!</h4>
                <p>Sie haben {stats.pendingChanges} offene Änderungen, die Ihre Aufmerksamkeit erfordern.</p>
                <hr />
                <p className="mb-0">Verwenden Sie das ChangeBoard, um Ihre Aufgaben zu verwalten.</p>
              </div>
            </div>
          </div>

          {/* Statistik-Karten */}
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card card-dashboard h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="card-title mb-0">Meine Kunden</h5>
                    <div className="rounded-circle bg-primary bg-opacity-10 p-2">
                      <i className="bi bi-people text-primary fs-4"></i>
                    </div>
                  </div>
                  <h2 className="display-6 fw-bold mb-0">{stats.assignedCustomers}</h2>
                  <p className="text-muted">Zugewiesene Kunden</p>
                  <Link href="#" className="btn btn-sm btn-outline-primary">Kundenliste</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card card-dashboard h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="card-title mb-0">Offene Änderungen</h5>
                    <div className="rounded-circle bg-warning bg-opacity-10 p-2">
                      <i className="bi bi-kanban text-warning fs-4"></i>
                    </div>
                  </div>
                  <h2 className="display-6 fw-bold mb-0">{stats.pendingChanges}</h2>
                  <p className="text-muted">Ausstehende Aufgaben</p>
                  <Link href="/changeboard/Kunde A" className="btn btn-sm btn-outline-warning">ChangeBoard öffnen</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card card-dashboard h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="card-title mb-0">Abgeschlossen</h5>
                    <div className="rounded-circle bg-success bg-opacity-10 p-2">
                      <i className="bi bi-check-circle text-success fs-4"></i>
                    </div>
                  </div>
                  <h2 className="display-6 fw-bold mb-0">{stats.completedChanges}</h2>
                  <p className="text-muted">Erledigte Änderungen</p>
                  <Link href="#" className="btn btn-sm btn-outline-success">Verlauf anzeigen</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Meine Aufgaben */}
          <div className="row">
            <div className="col-12 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="card-title mb-0">Meine aktuellen Aufgaben</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Priorität</th>
                          <th scope="col">Kunde</th>
                          <th scope="col">Beschreibung</th>
                          <th scope="col">Fälligkeitsdatum</th>
                          <th scope="col">Status</th>
                          <th scope="col">Aktion</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><span className="badge bg-danger">Hoch</span></td>
                          <td>Kunde A</td>
                          <td>Server-Update durchführen</td>
                          <td>25.04.2025</td>
                          <td><span className="badge bg-warning text-dark">In Bearbeitung</span></td>
                          <td>
                            <Link href="/changeboard/Kunde A" className="btn btn-sm btn-outline-primary">Bearbeiten</Link>
                          </td>
                        </tr>
                        <tr>
                          <td><span className="badge bg-warning text-dark">Mittel</span></td>
                          <td>Kunde B</td>
                          <td>Backup-System konfigurieren</td>
                          <td>28.04.2025</td>
                          <td><span className="badge bg-warning text-dark">In Bearbeitung</span></td>
                          <td>
                            <Link href="/changeboard/Kunde B" className="btn btn-sm btn-outline-primary">Bearbeiten</Link>
                          </td>
                        </tr>
                        <tr>
                          <td><span className="badge bg-info">Niedrig</span></td>
                          <td>Kunde A</td>
                          <td>Dokumentation aktualisieren</td>
                          <td>30.04.2025</td>
                          <td><span className="badge bg-secondary">Nicht begonnen</span></td>
                          <td>
                            <Link href="/changeboard/Kunde A" className="btn btn-sm btn-outline-primary">Bearbeiten</Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
