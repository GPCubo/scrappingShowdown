import puppeteer, {Browser,Page} from 'puppeteer';
interface targetPKM {
    name:'',
    StatusBase:{
        HP:0,
        Attack:0,
        Defense:0,
        SpAtk:0,
        SpDef:0,
        Speed:0	
    },
    // Este de ultimo
    infoThis:{
        HP:0,
        Attack:0,
        Defense:0,
        SpAtk:0,
        SpDef:0,
        Speed:0,
        Obj:''
    },
    targetObjects:[]
}
export class Searcher {
    inThisPage!:Page;
    opponentPKMS:[targetPKM]|[]=[]
    constructor(page:Page){
        this.inThisPage = page;
    }
    async searchPkm(){
        await this.inThisPage.waitForSelector('div[class="rightbar"][aria-label="Opponent\'s Team"]')
        const opponentTeam = await this.inThisPage.$$eval('.rightbar > .trainer-far > .teamicons span[aria-label]', 
        divs => divs.map(div => div.ariaLabel)); 
        // opponentTeam.map(pkm => )
        return opponentTeam
    }
}
const puchamons = [

]