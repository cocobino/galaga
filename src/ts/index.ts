import Missile from './missile';
import Player from './player';
import ScoreManager from './scoreManager';
import TextManager from './textmanager';
import StageManager from './stageManager';
import Enermy from './enermy';
import Observer from './module/observer';

class SceneManager {
    private playerManager:Player;
    private textManager:TextManager;
    private scoreManager:ScoreManager;
    private missileManager:Missile;
    private stageManager:StageManager
    private observer:Observer;

    private parentDOM:HTMLElement;
    private enermyDOM:HTMLElement;
    private scoreDOM:HTMLElement
    private possibleFire:boolean = true;
    private timeOffset:number = 2000;
    private count:number = 0;

    constructor() {
        this.playerManager = Player.getInstance();
        this.textManager = TextManager.getInstance();
        this.scoreManager = ScoreManager.getInstance();
        this.stageManager = StageManager.getInstance();
        this.observer = Observer.getInstance();

        this.parentDOM = document.querySelector('#content');
        this.enermyDOM = document.querySelector('#enermyArea');

        this.observer.registerObserver('redrawScore', this.redrawScore.bind(this));

        this.event();
        this.drawText();
        this.drawScore();
        this.drawStage();
    }
    
    event() {
        document.addEventListener('keydown', e => {
            if(e.key === 'Enter' && !this.textManager.getIntroUse && this.count > 3) {
                this.textManager.setIntroUse(true);
                this.drawPlayer();
            }
            if(e.keyCode === 32 && this.textManager.getIntroUse && this.possibleFire) {
                this.fire();
            }
        });
    }

    drawText() {
        this.parentDOM.appendChild(this.textManager.getTextDOM);
        this.timeOffset = 2000;
        const textArea = this.textManager.getTextDOM;
        textArea.setAttribute('class', 'textArea');
        
        this.count = 0;
        this.textManager.getText.forEach((txt:string, idx:number) => {
            setTimeout(() => textArea.setAttribute('style', 'opacity:1;'), (this.count)*this.timeOffset);
            setTimeout(() => {
                textArea.innerHTML = txt;
            }, this.count*this.timeOffset);
            idx !== 3 ? setTimeout(() => { 
            textArea.setAttribute('style', 'opacity:0;');
         }, this.count*this.timeOffset+1000) : '';
            this.count++;
        }); 
    }

    drawScore() {
        this.scoreDOM = document.createElement('div');

        this.scoreDOM.setAttribute('class', 'curScore');
        this.scoreDOM.setAttribute('id', 'curScore');
        this.scoreDOM.setAttribute('style', 'opacity:0;')
        this.scoreDOM.innerHTML = `${this.scoreManager.getCurScore}`;
        setTimeout(() => {
            this.parentDOM.appendChild(this.scoreDOM);
            this.scoreDOM.setAttribute('style', 'opacity:1;');
        }, this.count*this.timeOffset)
    }

    redrawScore() {
        this.scoreDOM.innerHTML = `${this.scoreManager.getCurScore}`;
    }
    
    drawPlayer() {
        this.parentDOM.removeChild(this.textManager.getTextDOM);
        document.querySelector('#playerArea').appendChild(this.playerManager.getPlayerDOM);
        
    }

    drawStage() {
        this.stageManager.readyMap();
        const enermyList:Array<Enermy> = this.stageManager.getMap;
        

        enermyList.forEach(enermy => {
            this.enermyDOM.appendChild(enermy.getEneryDOM);
        });
        
    }

    fire() {
        this.missileManager = new Missile('player');
        this.possibleFire = false;
        setTimeout(() => this.possibleFire = true, 1000);
        const missileDOM = this.missileManager.getMissile;
        missileDOM['style']['left'] = `${this.playerManager.getPlayerX+18}px`;
        this.enermyDOM.appendChild(missileDOM);
        
    }
}

export default new SceneManager();