import express from 'express';
import os from 'os';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
app.use(express.json());

const dbPromise = open({ filename: './data/looped.db', driver: sqlite3.Database });

(async () => {
  const db = await dbPromise;
  await db.exec((await (await fetch('file://'+process.cwd()+'/schema.sql')).text()).toString().replace(/\r/g,''));
})().catch(e=>console.error(e));

app.get('/api/device', (req,res) => {
  const hostname = os.hostname();
  const ifaces = os.networkInterfaces();
  const ips = [];
  Object.values(ifaces).flat().filter(Boolean).forEach(i=>{
    if(i.family === 'IPv4') ips.push(i.address);
  });
  res.json({ hostname, ips });
});

app.get('/api/calls', async (req,res) => {
  const db = await dbPromise;
  const rows = await db.all('SELECT * FROM calls ORDER BY timestamp DESC LIMIT 100');
  res.json(rows);
});

app.listen(3000, ()=> console.log('Looped API listening on :3000'));
