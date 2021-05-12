import { Publisher, OrderCreatedEvent, Subjects } from "@cdtickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated
}
