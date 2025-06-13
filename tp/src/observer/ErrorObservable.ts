
type ErrorMessageCb = (errorMsg: string) => void

class ErrorObservable {

    private observers: ErrorMessageCb[] = [];
    private notifiyTimeoutId?: number;

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
        if (this.notifiyTimeoutId) {
            clearTimeout(this.notifiyTimeoutId)
        }
        this.notifiyTimeoutId = setTimeout(() => {
            this.observers.forEach(obs => {
                obs(error);
            });
        }, 300)
    }

}

const errorObservable = new ErrorObservable();
export default errorObservable;