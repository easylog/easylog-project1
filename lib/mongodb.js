import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Bitte definieren Sie die MONGODB_URI Umgebungsvariable');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In der Entwicklungsumgebung verwenden wir eine globale Variable, um die Verbindung zu speichern
  // um Hot Reloading zu vermeiden
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In der Produktionsumgebung ist es besser, eine neue Verbindung pro Anfrage zu verwenden
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Exportieren einer Datenbank-Verbindungsfunktion
export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || 'easylog');
  return { client, db };
}

// Exportieren des clientPromise direkt
export default clientPromise;
