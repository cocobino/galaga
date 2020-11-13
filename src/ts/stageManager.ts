import Enermy from './enermy';

class StageManager {
    public static _stageManager:StageManager;
    private _enermyList:Array<Enermy>=[];

    private constructor() { }

    public static getInstance() {
        if(!this._stageManager) {
            this._stageManager = new StageManager();
        }
        
        return this._stageManager;
    }

    clearMap() {
        this._enermyList = [];
    }

    readyMap() {
        for(let i=1; i<=40; i++) {
            const rand = (Math.floor(Math.random()*10))%2;
            const enermy = new Enermy(i, rand, (i%10)*80, Math.ceil(i/10)*70);
            this._enermyList.push(enermy);
        }
    }
    
    get getMap():Array<Enermy> {
        return this._enermyList;
    }

}

export default StageManager;