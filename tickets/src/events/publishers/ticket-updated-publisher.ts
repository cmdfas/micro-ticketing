import { Publisher, Subjects, TicketUpdatedEvent  } from '@cdtickets/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {

    subject: Subjects.TicketUpdated = Subjects.TicketUpdated

}
