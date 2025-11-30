import { EventEmitter } from 'events';
import { sendEmail } from './sendEmail.service';

export enum EMAIL_EVENTS_ENUM {
  VERIFY_EMAIL = 'verify_email',
  RESET_PASSWORD = 'reset_password',
}
export class EmailEvents {
  constructor(private readonly emitter: EventEmitter) {}
  subscribe = (event: EMAIL_EVENTS_ENUM, callBack: (payload: any) => void) => {
    this.emitter.on(event, callBack);
  };
  publish = (event: EMAIL_EVENTS_ENUM, payload: any) => {
    this.emitter.emit(event, payload);
  };
}
const emitter = new EventEmitter();
export const emailEmitter = new EmailEvents(emitter);
emailEmitter.subscribe(
  EMAIL_EVENTS_ENUM.VERIFY_EMAIL,
  ({ to, subject, html }: { to: string; subject: string; html: string }) => {
    sendEmail({ to, subject, html });
  },
);
emailEmitter.subscribe(
  EMAIL_EVENTS_ENUM.RESET_PASSWORD,
  ({ to, subject, html }: { to: string; subject: string; html: string }) => {
    sendEmail({ to, subject, html });
  },
);
