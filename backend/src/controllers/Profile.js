const connection = require('../database/connection');

module.exports = {
  async list(req, res) {
    const ong_id = req.headers.authorization;
    try {
      const incidents = await connection('incidents').where('ong_id', ong_id).select('*');
      return res.json({ incidents });
    } catch (err) {
      return res.status(400).json({ error: 'Cannot list' });
    }
  }
}
