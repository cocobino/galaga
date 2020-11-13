
class ScoreManager{
    private _scoreList:Array<{score:number, name:string}> = [];
    private _curScore:number = 0;
    public static _scoreManager:ScoreManager;
    private constructor() {}


    public static getInstance() {
        if(!this._scoreManager) {
            this._scoreManager = new ScoreManager();
        }

        return this._scoreManager;
    }


    setCurScore(score:number) {
        this._curScore = score;
    }

    setScoreList(score:number, name:string) {
        this._scoreList.push({score, name});
        this._scoreList.sort((a, b) => {
            if(a.score > b.score) return 1;
            else if(a.score < b.score) return -1;
            else return 0;
        });
    }

    get getScoreList() {
        return this._scoreList;
    }

    get getCurScore() {
        return this._curScore;
    }
}


export default ScoreManager;