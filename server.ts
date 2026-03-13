import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from "better-sqlite3";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize Database
  const db = new Database("pillar.db");
  db.exec(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS contact_inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  app.use(express.json());

  // API Routes
  app.post("/api/appointments", (req, res) => {
    const { name, email, date, time, details } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO appointments (name, email, date, time, details) VALUES (?, ?, ?, ?, ?)");
      stmt.run(name, email, date, time, details);
      res.status(201).json({ success: true, message: "Appointment requested successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ success: false, message: "Failed to save appointment" });
    }
  });

  app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO contact_inquiries (name, email, subject, message) VALUES (?, ?, ?, ?)");
      stmt.run(name, email, subject, message);
      res.status(201).json({ success: true, message: "Inquiry sent successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ success: false, message: "Failed to save inquiry" });
    }
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    // Simple demo auth
    if (email === "admin@pillar.com" && password === "password") {
      res.json({ success: true, token: "demo-token", user: { name: "Admin", email } });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
