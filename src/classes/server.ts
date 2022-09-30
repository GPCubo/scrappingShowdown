import puppeteer, {Browser,Page} from 'puppeteer';
import { Searcher } from './searcher';
const inquirer = require('inquirer');
const fs = require('fs');
/*
OBJETIVO:
    SIMPLEMENTE ABRIR EL NAVEGADOR 
    PARA EL USUARIO,QUE NOS PERMITIRA HACER EL SCRAPPING
*/ 
export class Server {
    browser!:Browser;
    pageOne!:Page;
    qDefault={
        type:'list',
        name:'option',
        message:"Scrapping showdown is running... What would you like to do?",
        choices:['Info this POKEMON','development']
    }
    constructor(){
        this.browser;
        this.pageOne;
        this.qDefault;
    }

    async onInit(){
        try {
            this.browser = await puppeteer.launch({
                headless:false,
                executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
            });
            this.pageOne = await this.browser.newPage();
            //NOTA: Esto habra que meterle mas mano luego
            // await this.pageOne.setViewport({
            //     width: 1920,
            //     height: 1080
            //   });
            
            await this.pageOne.goto(process.env.SHOWDOWN || "");
            
            process.env.PRODUCTION === '0' ? 
            await this.onSwitch('development')
            :await this.onConsole()
        } catch (error) {
            throw new Error(
                `Ha ocurrido un error al inicializar 
                la applicación: ${error || ''}`
            )
        }
    }
    onClose(){
        this.browser.close();
    };
    async onConsole(){
        const prompt = inquirer.createPromptModule();
        const { option } = await prompt(this.qDefault);
        this.onSwitch(option);
    };
    async onSwitch(option:string){
        switch (option) {
            case 'Info this POKEMON':
                const opponentTeam = await new Searcher(this.pageOne).searchPkm();
                console.log(opponentTeam)
                this.onConsole();
                break;
            case 'development':
                await this.pageOne.click('button[name="login"]');
                await this.pageOne.keyboard.type(process.env.NAME || 'example20139');
                await this.pageOne.keyboard.press('Enter');
                await this.pageOne.click('button[value="teambuilder"]');
                await this.pageOne.waitForSelector('button[value="team"]')
                await this.pageOne.click('button[value="team"]');
                await this.pageOne.waitForSelector('button[name="import"]')
                await this.pageOne.click('button[name="import"]');
                await this.pageOne.keyboard.type(
                    fs.readFileSync(__dirname + '/../../TEST.txt').toString())
                await this.pageOne.click('button[name="saveImport"]');
                await this.pageOne.waitForSelector('button[class="select formatselect teambuilderformatselect"]');
                await this.pageOne.click('button[class="select formatselect teambuilderformatselect"]');
                await this.pageOne.waitForSelector('button[value="gen8nationaldex"]');
                await this.pageOne.click('button[value="gen8nationaldex"]');
                await this.pageOne.click('button[name="validate"]');
                await this.pageOne.waitForSelector('button[name="close"]');
                await this.pageOne.click('button[name="close"]');
                await this.pageOne.click('a[href="/"]')
                await this.pageOne.waitForSelector('button[class="select formatselect"]');
                await this.pageOne.click('button[class="select formatselect"]');
                await this.pageOne.waitForSelector('button[value="gen8nationaldex"][name="selectFormat"]')
                    .then(el => el?.click());
                await this.pageOne.click('button[class="button mainmenu1 big"]');
                const ab =  await new Searcher(this.pageOne).searchPkm();
                console.log(ab)
                break;
            default:
                break;
        }
    }
}