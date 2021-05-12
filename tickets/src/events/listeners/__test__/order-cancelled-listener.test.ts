import { OrderCancelledEvent } from "@cdtickets/common"
import { Types } from "mongoose"
import { Message } from "node-nats-streaming"
import { Ticket } from "../../../models/ticket"
import { natsWrapper } from "../../../nats-wrapper"
import { OrderCancelledListener } from "../order-cancelled-listener"


const setup = async () => {

    const listener = new OrderCancelledListener(natsWrapper.client)

    const orderId = Types.ObjectId().toHexString()
    const ticket = Ticket.build({
        title: 'conee',
        price: 20,
        userId: 'fewjf'
    })
    ticket.set({ orderId })
    await ticket.save()


    const data: OrderCancelledEvent['data'] = {
        id: orderId,
        version: 0,
        ticket: {
            id: ticket.id
        }
    }

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, ticket, data, orderId, msg }
}

it('updates the ticket, publishes an event, and acks the message', async () => {
    const { listener, ticket, data, orderId, msg } = await setup()

    await listener.onMessage(data, msg)

    const updatedTicket = await Ticket.findById(ticket.id)

    expect(updatedTicket?.orderId).not.toBeDefined()
    expect(msg.ack).toHaveBeenCalled()
    expect(natsWrapper.client.publish).toHaveBeenCalled()
})