import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Pool } from "pg";

export type ContactInput = {
  name: string;
  email: string;
  service?: string;
  message: string;
};

export type Contact = ContactInput & {
  id: string;
  createdAt: string;
};

export interface ContactStore {
  initialize(): Promise<void>;
  create(input: ContactInput): Promise<Contact>;
}

class PostgresContactStore implements ContactStore {
  private readonly pool: Pool;

  constructor(connectionString: string) {
    this.pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
      max: 10,
    });
  }

  async initialize() {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id UUID PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(254) NOT NULL,
        service VARCHAR(120),
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
  }

  async create(input: ContactInput) {
    const id = randomUUID();
    const result = await this.pool.query<Contact & { created_at: Date }>(
      `INSERT INTO contact_submissions (id, name, email, service, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, service, message, created_at`,
      [id, input.name, input.email, input.service || null, input.message],
    );
    const saved = result.rows[0];
    return { ...saved, createdAt: saved.created_at.toISOString() };
  }
}

class JsonContactStore implements ContactStore {
  private readonly filePath = path.resolve(process.cwd(), "data", "contacts.json");
  private writeQueue: Promise<void> = Promise.resolve();

  async initialize() {
    await mkdir(path.dirname(this.filePath), { recursive: true });
    try {
      await readFile(this.filePath, "utf8");
    } catch {
      await writeFile(this.filePath, "[]", "utf8");
    }
  }

  async create(input: ContactInput) {
    const contact: Contact = {
      ...input,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    };

    this.writeQueue = this.writeQueue.then(async () => {
      const raw = await readFile(this.filePath, "utf8");
      const contacts = JSON.parse(raw) as Contact[];
      contacts.push(contact);
      await writeFile(this.filePath, JSON.stringify(contacts, null, 2), "utf8");
    });
    await this.writeQueue;
    return contact;
  }
}

export function createContactStore(): ContactStore {
  return process.env.DATABASE_URL
    ? new PostgresContactStore(process.env.DATABASE_URL)
    : new JsonContactStore();
}
