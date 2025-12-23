import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const logPath = path.join(process.cwd(), 'public', 'public-logs.html');
    const { date, url, user, reviewed, fixed } = req.body;

    const logEntry = `
      <tr>
        <td>${date}</td>
        <td>${url}</td>
        <td>${user}</td>
        <td>${reviewed ? '✅' : '❌'}</td>
        <td>${fixed ? '✅' : '❌'}</td>
      </tr>
    `;

    // Si el archivo no existe, créalo con la estructura HTML básica
    if (!fs.existsSync(logPath)) {
      const initialHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>SuperAudio Logs</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>SuperAudio System Logs</h1>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>URL</th>
                <th>User</th>
                <th>Reviewed</th>
                <th>Fixed</th>
              </tr>
            </thead>
            <tbody>
              ${logEntry}
            </tbody>
          </table>
        </body>
        </html>
      `;
      fs.writeFileSync(logPath, initialHTML);
    } else {
      // Si existe, agrega la nueva entrada
      const currentContent = fs.readFileSync(logPath, 'utf8');
      const newContent = currentContent.replace('</tbody>', logEntry + '</tbody>');
      fs.writeFileSync(logPath, newContent);
    }

    res.status(200).json({ message: 'Log saved successfully' });
  } catch (error) {
    console.error('Error saving log:', error);
    res.status(500).json({ message: 'Error saving log' });
  }
}