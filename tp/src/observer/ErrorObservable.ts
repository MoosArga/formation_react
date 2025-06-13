
type ErrorMessageCb = (errorMsg: string) => void

class ErrorObservable {

    private observers: ErrorMessageCb[] = [];

    constructor() {}

    subscribe(callback: ErrorMessageCb) {
        this.observers.push(callback);
    }

    unsubscribe(callback: ErrorMessageCb) {
        const index = this.observers.findIndex(cb => cb === callback);
        if (index >= 0) {
            this.observers.splice(index, 1);
        }
    }

    notify(error: string) {
        this.observers.forEach(obs => {
            obs(error);
        });
    }

}

const errorObservable = new ErrorObservable();
export default errorObservable;