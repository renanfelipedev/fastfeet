import Recipient from '../models/Recipient';

class RecipientController {
  async index(request, response) {
    const recipients = await Recipient.findAll();

    return response.json(recipients);
  }

  async show(request, response) {
    const recipient = await Recipient.findByPk(request.params.id);

    if (recipient) {
      return response.json(recipient);
    }

    return response.status(401).json({ error: 'Recipient not found. ' });
  }

  async store(request, response) {
    const recipient = await Recipient.create(request.body);

    return response.json(recipient);
  }

  async update(request, response) {
    const recipient = await Recipient.findByPk(request.params.id);

    if (recipient) {
      await recipient.update(request.body, { returning: true });
      return response.json(recipient);
    }

    return response.status(401).json({ error: 'Recipient not found. ' });
  }

  async delete(request, response) {
    const recipient = await Recipient.findByPk(request.params.id);
    if (recipient) {
      await recipient.destroy();
      return response.json();
    }

    return response.status(401).json({ error: 'Recipient not found. ' });
  }
}

export default new RecipientController();
