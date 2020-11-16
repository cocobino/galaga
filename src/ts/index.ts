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
    // 2개를 같이관리하면 더 좋을거같다.
    private scoreDOM:HTMLElement;
    private lifeDOM:HTMLElement;
    private playerAreaDOM:HTMLElement;

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
        this.playerAreaDOM = document.querySelector('#playerArea');

        this.observer.registerObserver('redrawScore', this.redrawScore.bind(this));
        this.observer.registerObserver('redrawLife', this.redrawLife.bind(this));
        this.observer.registerObserver('redrawPlayer', this.redrawPlayer.bind(this));

        this.event();
        this.drawText();
        this.drawScore();
        this.lifeCount();
    }
    
    event() {
        document.addEventListener('keydown', e => {
            if(e.key === 'Enter' && !this.textManager.getIntroUse && this.count > 3) {
                this.playerManager.setPlayerPositionX(480);
                this.textManager.setIntroUse(true);
                this.drawPlayer();
                this.drawStage();
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
        this.playerAreaDOM.appendChild(this.playerManager.getPlayerDOM);
    }

    redrawPlayer() {
        this.playerManager.setPlayerPositionX(480);
        this.playerAreaDOM.appendChild(this.playerManager.getPlayerDOM);
    }

    drawStage() {
        this.stageManager.readyMap();
        const enermyList:Array<Enermy> = this.stageManager.getMap;
        

        enermyList.forEach(enermy => {
            this.enermyDOM.appendChild(enermy.getEneryDOM);
        });
        
    }

    lifeCount() {
        this.lifeDOM = document.createElement('div');
        this.lifeDOM.setAttribute('class', 'lifeScore');
        this.lifeDOM.innerHTML = `lifeCount: ${this.playerManager.getPlayerLifeCount}`;

        setTimeout(() => {
            this.parentDOM.appendChild(this.lifeDOM);
        }, this.count*this.timeOffset);
    }

    redrawLife() {
        this.lifeDOM.innerHTML = `lifeCount: ${this.playerManager.getPlayerLifeCount}`;
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