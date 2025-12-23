export default function handler(req, res) {
  res.status(200).json({ version: '0.9.9' }); // Cambia la versión cuando actualices la aplicación
}
