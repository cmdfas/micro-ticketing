import { PaymentCreatedEvent, Publisher, Subjects } from "@cdtickets/common";


export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated
}