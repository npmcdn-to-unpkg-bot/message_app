import {PartialObserver} from '../Observer';
import {Subscriber} from '../Subscriber';
import {$$rxSubscriber} from '../symbol/rxSubscriber';

export function toSubscriber<T>(
  nextOrObserver?: PartialObserver<T> | ((value: T) => void),
  error?: (error: any) => void,
  complete?: () => void): Subscriber<T> {

  if (nextOrObserver) {
    if (nextOrObserver instanceof Subscriber) {
      return (<Subscriber<T>> nextOrObserver);
    }

    if (nextOrObserver[$$rxSubscriber]) {
      return nextOrObserver[$$rxSubscriber]();
    }
  }

  if (!nextOrObserver && !error && !complete) {
    return new Subscriber();
  }

  return new Subscriber(nextOrObserver, error, complete);
}