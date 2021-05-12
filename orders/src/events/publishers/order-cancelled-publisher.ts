import { Publisher, Subjects, OrderCancelledEvent } from "@cdtickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}
