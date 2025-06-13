
type LoadingCb = (isActive: boolean) => void

class LoadingObservable {

    private observers: LoadingCb[] = [];

    constructor() {}

    subscribe(callback: LoadingCb) {
        this.observers.push(callback);
    }

    unsubscribe(callback: LoadingCb) {
        const index = this.observers.findIndex(cb => cb === callback);
        if (index >= 0) {
            this.observers.splice(index, 1);
        }
    }

    activate() {
        this.notify(true);
    }

    deactivate() {
        this.notify(false);
    }

    private notify(isActive: boolean) {
        this.observers.forEach(obs => {
            obs(isActive)
        })
    }

}

const loadingObservable = new LoadingObservable();
export default loadingObservable;