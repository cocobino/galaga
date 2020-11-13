class Observer {
    public static observer:Observer;
    private _observer:Array<any>;

    private constructor() {
        this._observer = [];
    }

    public static getInstance():Observer {
        if(!this.observer) this.observer = new Observer();
        return this.observer;
    }

    registerObserver(evtName:string, observer:any) {
        this._observer.push({name:evtName, handler:observer});
    }

    unregisterObserver(evtName:string) {
        this._observer = this._observer.filter(registobserver => registobserver.evtName !== evtName);
    }
    
    notifyObserver(evtName:string, data?:any) {
        this._observer.forEach((observer) => {
                observer.name === evtName ? observer.handler(data) : '';
        });
    }
}

export default Observer;