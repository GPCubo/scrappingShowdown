"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const searcher_1 = require("./searcher");
const inquirer = require('inquirer');
const fs = require('fs');
/*
OBJETIVO:
    SIMPLEMENTE ABRIR EL NAVEGADOR
    PARA EL USUARIO,QUE NOS PERMITIRA HACER EL SCRAPPING
*/
class Server {
    constructor() {
        this.qDefault = {
            type: 'list',
            name: 'option',
            message: "Scrapping showdown is running... What would you like to do?",
            choices: ['Info this POKEMON', 'development']
        };
        this.browser;
        this.pageOne;
        this.qDefault;
    }
    onInit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.browser = yield puppeteer_1.default.launch({
                    headless: false,
                    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
                });
                this.pageOne = yield this.browser.newPage();
                //NOTA: Esto habra que meterle mas mano luego
                // await this.pageOne.setViewport({
                //     width: 1920,
                //     height: 1080
                //   });
                yield this.pageOne.goto(process.env.SHOWDOWN || "");
                process.env.PRODUCTION === '0' ?
                    yield this.onSwitch('development')
                    : yield this.onConsole();
            }
            catch (error) {
                throw new Error(`Ha ocurrido un error al inicializar 
                la applicación: ${error || ''}`);
            }
        });
    }
    onClose() {
        this.browser.close();
    }
    ;
    onConsole() {
        return __awaiter(this, void 0, void 0, function* () {
            const prompt = inquirer.createPromptModule();
            const { option } = yield prompt(this.qDefault);
            this.onSwitch(option);
        });
    }
    ;
    onSwitch(option) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (option) {
                case 'Info this POKEMON':
                    const opponentTeam = yield new searcher_1.Searcher(this.pageOne).searchPkm();
                    console.log(opponentTeam);
                    this.onConsole();
                    break;
                case 'development':
                    yield this.pageOne.click('button[name="login"]');
                    yield this.pageOne.keyboard.type(process.env.NAME || 'example20139');
                    yield this.pageOne.keyboard.press('Enter');
                    yield this.pageOne.click('button[value="teambuilder"]');
                    yield this.pageOne.waitForSelector('button[value="team"]');
                    yield this.pageOne.click('button[value="team"]');
                    yield this.pageOne.waitForSelector('button[name="import"]');
                    yield this.pageOne.click('button[name="import"]');
                    yield this.pageOne.keyboard.type(fs.readFileSync(__dirname + '/../../TEST.txt').toString());
                    yield this.pageOne.click('button[name="saveImport"]');
                    yield this.pageOne.waitForSelector('button[class="select formatselect teambuilderformatselect"]');
                    yield this.pageOne.click('button[class="select formatselect teambuilderformatselect"]');
                    yield this.pageOne.waitForSelector('button[value="gen8nationaldex"]');
                    yield this.pageOne.click('button[value="gen8nationaldex"]');
                    yield this.pageOne.click('button[name="validate"]');
                    yield this.pageOne.waitForSelector('button[name="close"]');
                    yield this.pageOne.click('button[name="close"]');
                    yield this.pageOne.click('a[href="/"]');
                    yield this.pageOne.waitForSelector('button[class="select formatselect"]');
                    yield this.pageOne.click('button[class="select formatselect"]');
                    yield this.pageOne.waitForSelector('button[value="gen8nationaldex"][name="selectFormat"]')
                        .then(el => el === null || el === void 0 ? void 0 : el.click());
                    yield this.pageOne.click('button[class="button mainmenu1 big"]');
                    const ab = yield new searcher_1.Searcher(this.pageOne).searchPkm();
                    console.log(ab);
                    break;
                default:
                    break;
            }
        });
    }
}
exports.Server = Server;
