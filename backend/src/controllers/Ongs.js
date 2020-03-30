const crypto = require('crypto');

const connection = require('../database/connection');

module.exports = {

  async list(req, res) {
    try {
      const ongs = await connection('ongs').select('*');
      return res.json(ongs);
    } catch (err) {
      return res.status(400).json({ error: 'Cannot list' });
    }
  },

  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
    if (!name || !email || !whatsapp || !city || !uf) return res.status(400).json({ error: 'Missing information' });

    const id = crypto.randomBytes(4).toString('HEX');

    try {
      await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
      });
      res.json({ id });
    } catch (err) {
      return res.status(400).json({ error: 'Cannot create' });
    }
  }

}
