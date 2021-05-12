import { Publisher, Subjects, TicketCreatedEvent  } from '@cdtickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {

    subject: Subjects.TicketCreated = Subjects.TicketCreated

}
