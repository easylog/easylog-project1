import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>EasyLog - Logging und Change Management</title>
        <meta name="description" content="EasyLog - Ein System für Logging und Change Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">EasyLog</h1>
          <p className="lead">Ein modernes System für Logging und Change Management</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body p-5">
                <h2 className="card-title mb-4">Willkommen bei EasyLog</h2>
                <p className="card-text">
                  EasyLog bietet eine einfache und effektive Lösung für die Verwaltung von Logs und Änderungen in Ihrem Unternehmen.
                  Mit unserem System können Sie:
                </p>
                <ul className="list-group list-group-flush mb-4">
                  <li className="list-group-item">Änderungen für verschiedene Kunden verwalten</li>
                  <li className="list-group-item">Journal-Einträge mit GPT-Unterstützung erstellen</li>
                  <li className="list-group-item">Separate Dashboards für Administratoren und Mitarbeiter nutzen</li>
                </ul>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Link href="/auth/login">
                    <button className="btn btn-primary btn-lg px-4 me-md-2">Anmelden</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer mt-auto py-3 bg-light">
        <div className="container text-center">
          <span className="text-muted">© 2025 EasyLog</span>
        </div>
      </footer>
    </div>
  );
}
