import StageManager from './stageManager';
import ScoreManager from './scoreManager';
import Observer from './module/observer';
import Player from './player';

class Missile {
    private _missileDOM:HTMLElement;
    private _timer:any;
    private _drop:any;
    private _bomb:any;
    private _checkPlayer:any;
    private _enermyList:Array<any> = [];

    private stageManager:StageManager;
    private scoreManager:ScoreManager;
    private player:Player;
    private observer:Observer;
    
    constructor(type:string, positionX?:number, positionY?:number) {
        this.stageManager = StageManager.getInstance();
        this.scoreManager = ScoreManager.getInstance();
        this.observer = Observer.getInstance();
        this.player = Player.getInstance();
        
        type === 'player' ? this._setMissile() : this._dropMissile(positionX, positionY);
        this._enermyList = this.stageManager.getMap;
    }

    private _dropMissile(positionX:number, positionY:number) {
        this._missileDOM = document.createElement('div');
        this._missileDOM.setAttribute('style', `width:2px;height:5px;background:white;position:absolute;left:${positionX+125}px;top:${positionY+25}px;transition:top .5s linear`);
        this._drop = setInterval(() => {this._dropEnermyMissile(); }, 300);
        this._checkPlayer = setInterval(() => {this._bombPlayer();}, 300);
    }

    private _bombPlayer() {
        let playerLeft = this.player.getPlayerX;
        let playerTop = 980;
        let missileLeft = parseInt(this._missileDOM['style']['left']);
        let missileTop = parseInt(this._missileDOM['style']['top']);

        if((playerLeft <= missileLeft && missileLeft <= playerLeft+50) && 
        (playerTop <= missileTop && missileTop<= playerTop+50)) {
            //playerLife manage
            this.player.setPlayerPositionX(10000);
            this.player.setPlayerLifeCount(this.player.getPlayerLifeCount-1);
            this.observer.notifyObserver('redrawLife');
            
            //TODO gameResetz
            this.player.getPlayerDOM.remove();
            this.player.getPlayerLifeCount ? setTimeout(() => { this.observer.notifyObserver('redrawPlayer'); }, 3000) : '';
        }
    }

    private _dropEnermyMissile() {
        let curTop = parseInt(this._missileDOM['style']['top']);
        
        if(curTop > 1000) {
            this._missileDOM.remove();
            clearInterval(this._drop);
        }
        this._missileDOM['style']['top'] = `${curTop+60}px`;
    }

    private _setMissile() {
        this._missileDOM = document.createElement('div');
        this._missileDOM.setAttribute('style', 'width:2px;height:5px;background:white;position:absolute;bottom:0px;transition: bottom .5s linear');
        this._timer = setInterval(() => this._moveMissile(), 300);
        this._bomb = setInterval(() => { this.checkBomb(); }, 300);
    }

    private _moveMissile() {
        let curBottom = parseInt(this._missileDOM['style']['bottom']);
        if(curBottom > 900) {
            this._missileDOM.remove();
            clearInterval(this._timer);
            clearInterval(this._bomb);
        }
        this._missileDOM['style']['bottom'] = `${curBottom+60}px`;
    }
    
    private checkBomb() {
        const left = parseInt(this._missileDOM['style']['left']);
        const bottom = parseInt(this._missileDOM['style']['bottom']);
        
        this._enermyList.some((ele, idx) => {
            if((ele.getPositionX <= left && left <= ele.getPositionX+50) &&
            (ele.getPositionY <= (1000-bottom) && (1000-bottom) <= ele.getPositionY+50)) {
                    const DOM = document.querySelector(`div[data-sn="${ele.getSn}"]`);
                    DOM ? DOM.remove() :''; 
                    this._missileDOM.remove();
                    this._enermyList.splice(idx, 1);
                    this.scoreManager.setCurScore(this.scoreManager.getCurScore+ele.getScore);
                    this.observer.notifyObserver('redrawScore');
                    this.observer.notifyObserver(`lifeYn${ele.getSn}`);
                    clearInterval(this._bomb);
                    clearInterval(this._timer);
                    return true;
            }
        });
    }
    

    get getMissile():HTMLElement {
        return this._missileDOM;
    }
}

export default Missile;