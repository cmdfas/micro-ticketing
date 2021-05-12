import { ExpirationCompleteEvent, Publisher, Subjects } from "@cdtickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete

}