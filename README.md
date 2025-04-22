# EasyLog - Logging und Change Management System

EasyLog ist ein modernes System für Logging und Change Management, das mit Next.js und MongoDB entwickelt wurde. Es bietet separate Dashboards für Administratoren und Mitarbeiter, Journal-Einträge mit GPT-Unterstützung und ein ChangeBoard für die Verwaltung von Änderungen bei verschiedenen Kunden.

## Funktionen

- **Authentifizierungssystem**: Sicheres Login mit JWT und bcrypt
- **Admin-Dashboard**: Übersicht über Kunden, Änderungen und Journal-Einträge
- **Mitarbeiter-Dashboard**: Aufgabenverwaltung und Kundenübersicht
- **Journal**: Protokollierung von Aktivitäten mit GPT-Unterstützung
- **ChangeBoard**: Verwaltung von Änderungen für verschiedene Kunden
- **Responsive Design**: Optimiert für Desktop und mobile Geräte

## Voraussetzungen

- Node.js (Version 14 oder höher)
- MongoDB-Datenbank
- npm oder yarn

## Installation

1. Repository klonen:
   ```
   git clone https://github.com/ihr-benutzername/easylog.git
   cd easylog
   ```

2. Abhängigkeiten installieren:
   ```
   npm install
   ```

3. Umgebungsvariablen konfigurieren:
   - Kopieren Sie die Datei `.env.example` zu `.env.local`
   - Tragen Sie Ihre MongoDB-Verbindungs-URL und JWT-Secret ein

4. Datenbank initialisieren:
   - Rufen Sie die Bootstrap-API auf, um Admin- und Mitarbeiter-Benutzer zu erstellen:
   ```
   curl -X POST http://localhost:3000/api/bootstrap
   ```
   - Alternativ können Sie die Anwendung starten und im Browser `/api/bootstrap` aufrufen

5. Entwicklungsserver starten:
   ```
   npm run dev
   ```

6. Öffnen Sie [http://localhost:3000](http://localhost:3000) in Ihrem Browser

## Deployment auf Vercel

1. Erstellen Sie ein Konto auf [Vercel](https://vercel.com) falls noch nicht vorhanden

2. Installieren Sie die Vercel CLI:
   ```
   npm install -g vercel
   ```

3. Deployment durchführen:
   ```
   vercel
   ```

4. Folgen Sie den Anweisungen der Vercel CLI

5. Alternativ können Sie das Projekt auch direkt über die Vercel-Weboberfläche deployen, indem Sie Ihr GitHub-Repository verbinden

## Umgebungsvariablen

Die folgenden Umgebungsvariablen müssen in der `.env.local` Datei (Entwicklung) oder in den Vercel-Projekteinstellungen (Produktion) konfiguriert werden:

- `MONGODB_URI`: Die Verbindungs-URL zu Ihrer MongoDB-Datenbank
- `MONGODB_DB`: Der Name der Datenbank (Standard: "easylog")
- `JWT_SECRET`: Ein sicherer Schlüssel für die JWT-Generierung

## Standardbenutzer

Nach dem Ausführen des Bootstrap-Prozesses werden die folgenden Benutzer erstellt:

- **Administrator**:
  - E-Mail: admin@easylog.de
  - Passwort: admin123

- **Mitarbeiter**:
  - E-Mail: staff@easylog.de
  - Passwort: staff123

**Wichtig**: Ändern Sie diese Passwörter nach dem ersten Login!

## Projektstruktur

```
easylog/
├── lib/
│   └── mongodb.js         # MongoDB-Verbindung
├── pages/
│   ├── api/
│   │   ├── login.js       # Login-API (bcrypt + JWT)
│   │   ├── bootstrap.js   # Erstellt Admin + Staff
│   │   └── changeboard/
│   │       └── [kunde].js # ChangeBoard-Einträge speichern
│   ├── auth/
│   │   └── login.js       # Login-Formular
│   ├── dashboard/
│   │   ├── admin.js       # Admin Dashboard
│   │   └── staff.js       # Mitarbeiter Dashboard
│   ├── changeboard/
│   │   └── [kunde].js     # Kunden-ChangeBoard
│   ├── journal.js         # Journal-Seite mit GPT-Platzhalter
│   └── _app.js            # Next.js App-Komponente
├── styles/
│   └── globals.css        # Globale Styles
├── .env.example           # Beispiel für Umgebungsvariablen
├── next.config.js         # Next.js Konfiguration
└── package.json           # Projekt-Abhängigkeiten
```

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert.

## Support

Bei Fragen oder Problemen erstellen Sie bitte ein Issue im GitHub-Repository oder kontaktieren Sie uns direkt.
