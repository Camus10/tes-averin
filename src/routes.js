/**
 * @swagger
 * tags:
 *   - name: data
 *     description: Endpoints for managing data
 * definitions:
 *   getData:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID unik data.
 *       name:
 *         type: string
 *         description: Nama data.
 *       description:
 *         type: string
 *         description: Deskripsi data.
 *   executeData:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: Input Nama data.
 *       description:
 *         type: string
 *         description: Input Deskripsi data.
 */

const express = require('express');
const router = express.Router();
const db = require('./database');

/**
 * @swagger
 * /data:
 *   get:
 *     summary: Mendapatkan semua data
 *     tags:
 *       - data
 *     responses:
 *       200:
 *         description: Respons sukses
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/getData'
 */
router.get('/data', (req, res) => {
  db.query('SELECT * FROM data', (err, results) => {
    if(err){
      console.error('Error executing query:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /data/{id}:
 *   get:
 *     summary: Mendapatkan data berdasarkan ID
 *     tags:
 *       - data
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID data yang akan diambil
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Respons sukses
 *         schema:
 *           $ref: '#/definitions/getData'
 */
router.get('/data/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM data WHERE id = ?', id, (err, result) => {
    if(err){
      console.error('Error executing query:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    if(result.length === 0){
      return res.status(404).json({ message: 'Data not found' });
    }
    res.json(result);
  });
});

/**
 * @swagger
 * /data:
 *   post:
 *     summary: Menambahkan data baru
 *     tags:
 *       - data
 *     parameters:
 *       - name: data
 *         in: body
 *         description: Data yang akan ditambahkan
 *         required: true
 *         schema:
 *           $ref: '#/definitions/executeData'
 *     responses:
 *       200:
 *         description: Data added successfully
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             message:
 *               type: string
 */
router.post('/data', (req, res) => {
  const { name, description } = req.body;

  if(!name || !description){
    return res.status(400).json({ message: 'Invalid input. Name and description are required.' });
  }

  db.query('INSERT INTO data (name, description) VALUES (?, ?)', [name, description], (err, result) => {
    if(err){
      console.error('Error executing query:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json({ id: result.insertId, message: 'Data added successfully' });
  });
});

/**
 * @swagger
 * /data/{id}:
 *   put:
 *     summary: Memperbarui data berdasarkan ID
 *     tags:
 *       - data
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID data yang akan diperbarui
 *         required: true
 *         type: integer
 *       - name: data
 *         in: body
 *         description: Data yang akan diperbarui
 *         required: true
 *         schema:
 *           $ref: '#/definitions/executeData'
 *     responses:
 *       200:
 *         description: Data updated successfully
 *       404:
 *         description: Data not found
 */
router.put('/data/:id', (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;

  if(!name || !description){
    return res.status(400).json({ message: 'Invalid input. Name and description are required.' });
  }

  db.query('UPDATE data SET name = ?, description = ? WHERE id = ?', [name, description, id], (err, result) => {
    if(err){
      console.error('Error executing query:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    if(result.affectedRows === 0){
      return res.status(404).json({ message: 'Data not found' });
    }
    res.json({ message: 'Data updated successfully' });
  });
});

/**
 * @swagger
 * /data/{id}:
 *   delete:
 *     summary: Menghapus data berdasarkan ID
 *     tags:
 *       - data
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID data yang akan dihapus
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Data deleted successfully
 *       404:
 *         description: Data not found
 */
router.delete('/data/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM data WHERE id = ?', id, (err, result) => {
    if(err){
      console.error('Error executing query:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    if(result.affectedRows === 0){
      return res.status(404).json({ message: 'Data not found' });
    }
    res.json({ message: 'Data deleted successfully' });
  });
});

module.exports = router;