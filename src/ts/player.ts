
class Player {
    public static _player:Player;
    private _playerDOM:HTMLElement; //playerDOM
    private _playerX:number = 480;

    private constructor() {
        this._setPlayerDOM();
        this._move();
    }
    
    public static getInstance():Player {
        if(!Player._player) {
            Player._player = new Player();
        }
        return Player._player;
    }

    

    private _setPlayerDOM() {
        this._playerDOM = document.createElement('div');
        this._playerDOM.setAttribute('class', 'player');
        this._playerDOM.setAttribute('style', 'left:458px;');
    }

    private _move():void {
        document.addEventListener('keydown', (e:any) => {
            switch(e.keyCode) {
                case 37: this.setPlayerX(true); break;
                case 39: this.setPlayerX(false); break;
            }
        });
    }

    private setPlayerX(left : boolean):void {
        let offset:number = 25;
        this._playerX = left ? (this._playerX-offset > 0 ? this._playerX-=offset : 0) : (this._playerX+offset < 1000 ? this._playerX +=offset : 1000);
        this._playerDOM.setAttribute('style', `left:${this._playerX}px`);
    }

    public get getPlayerX() {
        return this._playerX;
    }

    public get getPlayerDOM():HTMLElement {
        return this._playerDOM;
    }
    
}

export default Player;