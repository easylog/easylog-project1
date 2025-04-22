import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  // Nur POST-Anfragen zulassen
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Methode nicht erlaubt' });
  }

  try {
    const { email, password } = req.body;

    // Überprüfen, ob alle erforderlichen Felder vorhanden sind
    if (!email || !password) {
      return res.status(400).json({ message: 'E-Mail und Passwort sind erforderlich' });
    }

    // Verbindung zur Datenbank herstellen
    const { db } = await connectToDatabase();
    
    // Benutzer in der Datenbank suchen
    const user = await db.collection('users').findOne({ email });

    // Überprüfen, ob der Benutzer existiert
    if (!user) {
      return res.status(401).json({ message: 'Ungültige Anmeldeinformationen' });
    }

    // Passwort überprüfen
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Ungültige Anmeldeinformationen' });
    }

    // JWT-Token erstellen
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET ist nicht definiert');
    }

    const token = jwt.sign(
      { 
        userId: user._id.toString(),
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    // Erfolgreiche Anmeldung
    return res.status(200).json({
      message: 'Anmeldung erfolgreich',
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login-Fehler:', error);
    return res.status(500).json({ message: 'Serverfehler bei der Anmeldung' });
  }
}
