import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  // Nur POST-Anfragen zulassen
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Methode nicht erlaubt' });
  }

  try {
    // Verbindung zur Datenbank herstellen
    const { db } = await connectToDatabase();
    
    // Überprüfen, ob bereits Benutzer existieren
    const userCount = await db.collection('users').countDocuments();
    
    if (userCount > 0) {
      return res.status(400).json({ message: 'Bootstrap kann nur auf einer leeren Datenbank ausgeführt werden' });
    }

    // Admin-Benutzer erstellen
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = {
      name: 'Administrator',
      email: 'admin@easylog.de',
      password: adminPassword,
      role: 'admin',
      createdAt: new Date()
    };

    // Staff-Benutzer erstellen
    const staffPassword = await bcrypt.hash('staff123', 10);
    const staff = {
      name: 'Mitarbeiter',
      email: 'staff@easylog.de',
      password: staffPassword,
      role: 'staff',
      createdAt: new Date()
    };

    // Benutzer in die Datenbank einfügen
    await db.collection('users').insertMany([admin, staff]);

    // Beispiel-Kunden erstellen
    const customers = [
      { name: 'Kunde A', contactPerson: 'Max Mustermann', email: 'kontakt@kunde-a.de', createdAt: new Date() },
      { name: 'Kunde B', contactPerson: 'Erika Musterfrau', email: 'kontakt@kunde-b.de', createdAt: new Date() },
      { name: 'Kunde C', contactPerson: 'John Doe', email: 'kontakt@kunde-c.de', createdAt: new Date() }
    ];

    await db.collection('customers').insertMany(customers);

    return res.status(200).json({ 
      message: 'Bootstrap erfolgreich durchgeführt',
      adminEmail: admin.email,
      staffEmail: staff.email,
      defaultPassword: 'Siehe .env.example für Standardpasswörter'
    });
  } catch (error) {
    console.error('Bootstrap-Fehler:', error);
    return res.status(500).json({ message: 'Serverfehler beim Bootstrap-Prozess' });
  }
}
