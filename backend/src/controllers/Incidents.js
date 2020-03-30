const connection = require('../database/connection');

module.exports = {

  async list(req, res) {

    const { page = 1 } = req.query;

    try {
      const [count] = await connection('incidents').count();

      const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(
          'incidents.*',
          'ongs.name',
          'ongs.email',
          'ongs.whatsapp',
          'ongs.city',
          'ongs.uf'
        );
      res.header('X-Total-Count', count['count(*)']);
      return res.json(incidents);
    } catch (err) {
      return res.status(400).json({ error: 'Cannot list' });
    }

  },

  async create(req, res) {

    const ong_id = req.headers.authorization;
    if (!ong_id) return res.status(401).json({ error: 'Unauthorized' });

    const { title, description, value } = req.body;
    if (!title || !description || !value) return res.status(400).json({ error: 'Missing information' });

    try {
      const ong = await connection('ongs').where('id', ong_id).select('*').first();
      if (!ong) return res.status(401).json({ error: 'Unauthorized' });

      const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        ong_id,
      });

      return res.json({ id });
    } catch (err) {
      return res.status(400).json({ error: 'Cannot create' });
    }


  },

  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    try {
      const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

      if (incident.ong_id !== ong_id) return res.status(401).json({ error: 'Unauthorized' });

      await connection('incidents').where('id', id).delete();

      return res.status(204).send();
    } catch (err) {
      return res.status(400).json({ error: 'Cannot delete' });
    }

  }

}
