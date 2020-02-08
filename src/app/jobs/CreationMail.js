import Mail from '../../lib/Mail';

class CreationMail {
  get key() {
    return 'CreationMail';
  }

  async handle({ data }) {
    const { order } = data;

    await Mail.sendMail({
      to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
      subject: 'Novo produto cadastrado',
      template: 'creation',
      context: {
        deliveryman: order.deliveryman.name,
        product: order.product,
        recipient: order.recipient.name,
        street: order.recipient.street,
        number: order.recipient.number,
        city: order.recipient.city,
        state: order.recipient.state,
        zip_code: order.recipient.zip_code,
      },
    });
  }
}

export default new CreationMail();
