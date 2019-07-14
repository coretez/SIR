const express = require('express');
const ticketsController = require('../controllers/ticketController');

function routes (Ticket) {
  const ticketRouter = express.Router();
  const controller = ticketsController(Ticket);

  ticketRouter.route('/tickets')
  .post(controller.post)
  .get(controller.get);

  /* This is the middlewaret to map a single event by ID to the ticklet attribute */
  ticketRouter.use('/tickets/:ticketId', (req, res, next) => {
    Ticket.findById(req.params.tickeId, (err, ticket) => {
      if (err) {
        return res.send(err);
      }
      if (ticket) {
        req.ticket = ticket;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  ticketRouter.route('/tickets/:ticketId')
    .get(controller.getById)
    .put(controller.putById)
    .patch(controller.patchById)
    .delete(controller.deleteById);

  return ticketRouter;
}

module.exports = routes
