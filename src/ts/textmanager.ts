class TextManager {
    public static _textManager:TextManager;
    private _introUse:boolean = false;
    private _textDOM:HTMLElement;
    private _textList:Array<string>; 
       

    private constructor() { 
        this._setTextDOM();
        this._setTextList();
    }
    
    public static getInstance() {
        if(!this._textManager) {
            this._textManager = new TextManager();
        }
        return this._textManager;
    }

    _setTextList() {
        this._textList = [
            '',
            '안녕하세요',
            '겔로그 게임을 시작합니다.',
            '시작하려면 Enter를 입력해주세요'
        ];
    }

    _setTextDOM() {
        this._textDOM = document.createElement('div');
        this._textDOM.setAttribute('class', 'textArea');
        
    }
    
    get getTextDOM():HTMLElement {
        return this._textDOM
    }

    get getText(): Array<string> {
        return this._textList;
    }

    setIntroUse(introUse:boolean) {
        this._introUse = introUse;
    }

    get getIntroUse() {
        return this._introUse;
    }
}

export default TextManager;