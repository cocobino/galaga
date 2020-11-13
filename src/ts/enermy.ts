import Missile from './missile';
import Observer from './module/observer';

class Enermy {
    private type:number;
    private sn:number;
    private positionX:number;
    private positionY:number;
    private enermyDOM: HTMLElement;
    private score:number;
    private missile:Missile;
    private observer:Observer;

    private createMissile:any;

    constructor(sn:number, type:number, positionX:number, positionY:number) {
        this.sn = sn;
        this.type = type;
        this.positionX = positionX;
        this.positionY = positionY;
        this.score = (type+1)*10;
        this.observer =Observer.getInstance();
        
        this.missile = new Missile('enermy', positionX, positionY);
        this._setEnermy();

        this.createMissile = setInterval(() => { this.missile = new Missile('enermy', positionX, positionY); this._setEnermy(); }, 5000);
        this.observer.registerObserver(`lifeYn${sn}`, this._clearMissile.bind(this));
    }

    private _clearMissile() {
        clearInterval(this.createMissile);
    }

    private _setEnermy() {
        this.enermyDOM = document.createElement('div');
        this.enermyDOM.setAttribute('data-sn', `${this.sn}`);
        this.enermyDOM.setAttribute('class', `type${this.type} enermy`);
        this.enermyDOM.setAttribute('style', `position:absolute; left:${100+this.positionX}px; top:${this.positionY}px; z-index:100; background-size: 50px;`);
        
        document.querySelector('#enermyArea').appendChild(this.missile.getMissile);
    }


    get getEneryDOM():HTMLElement {
        return this.enermyDOM;
    }
    
    get getPositionX():number {
        return this.positionX+100;
    }

    get getPositionY():number {
        return this.positionY;
    }

    get getSn():number {
        return this.sn;
    }

    get getScore():number {
        return this.score;
    }
    
}

export default Enermy;