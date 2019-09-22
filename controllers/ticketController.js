function ticketController(Ticket) {
  function post(req, res) {
    const ticket = new Ticket(req.body);
    /* check for required fields */
    if (!req.body.subject) {
      console.log('Failed Vaildation', req.body);
      res.status(400);
      return res.send('A Subject is required');
    }

    ticket.save();
    res.status(201);
    return res.json(ticket);
  }

  function get(req, res) {
    const { query } = req;
    Ticket.find(query, (err, tickets) => {
      if (err) {
        return res.send(err);
      }
      return res.json(tickets);
    });
  }

  function getById (req, res) 
  { 
    res.json(req.ticket); 
  }

  function putById (req, res) {
    const { ticket } = req;
    /* One-for-one relationship between request (req) elements and the model */
    ticket.title = req.body.title;
    ticket.author = req.body.author;
    ticket.genre = req.body.genre;
    ticket.read = req.body.read;
    req.ticket.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(ticket);
    });
  }

  function patchById (req, res) {
    const { ticket } = req;
    if (req.body._id) {
      delete req.body._id;
    }
    Object.entries(req.body).forEach(item => {
      const key = item[0];
      const value = item[1];
      ticket[key] = value;
    })
    req.ticket.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(ticket);
    });
  }

  function deleteById (req, res) {
    req.ticket.remove((err) => {
      if (err) {
        return res.send(err);
      }
      return res.sendStatus(204);
    })
  }

  return { post, get, getById, putById, patchById, deleteById };
}

module.exports = ticketController;
