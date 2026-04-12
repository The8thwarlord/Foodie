const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

router.use(authenticate, isAdmin);

// GET analytics
router.get('/analytics', async (req, res) => {
  try {
    const ordersResult = await db.query('SELECT COUNT(*) as total_orders, SUM(total) as revenue FROM orders');
    const usersResult = await db.query("SELECT COUNT(*) as total_users FROM users WHERE role = 'customer'");
    
    res.json({
      totalOrders: parseInt(ordersResult.rows[0].total_orders || 0),
      revenue: parseFloat(ordersResult.rows[0].revenue || 0),
      activeUsers: parseInt(usersResult.rows[0].total_users || 0)
    });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all orders
router.get('/orders', async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT o.id, o.customer_name, o.address, o.total, o.created_at, o.status, u.email 
      FROM orders o 
      LEFT JOIN users u ON o.user_id = u.id 
      ORDER BY o.created_at DESC
    `);
    res.json(rows);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update order status
router.put('/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if(!status) return res.status(400).json({ error: 'Status is required' });
    
    const { rowCount } = await db.query('UPDATE orders SET status = $1 WHERE id = $2', [status, id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Order not found' });
    
    res.json({ message: 'Order status updated' });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
