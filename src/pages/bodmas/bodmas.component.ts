import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ISymbol, IStoredValue } from './bodmas.model';
import { BodmasService } from './bodmas.service';
import { SucessComponent } from './success/sucess.component';

@Component({
    selector: 'app-bodmas',
    templateUrl: 'bodmas.component.html'
})

export class BodmasComponent implements OnInit {
    question: string = '';
    output: string = '';
    isCorrect: boolean;
    status: string = '';
    score: number = 0;
    operation: ISymbol;
    numberPad: number[] = [];
    level: number = 3;
    totalScore: number = 0;
    private scoreValue = [10, 15, 20, 25];
    private sucessScore = [100, 200, 300, 400];
    private expectedOutput = 0;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController,
        private cdr: ChangeDetectorRef, private bodmasService: BodmasService,
        private storage: Storage) {
    }

    ngOnInit() {
        this.numberPad = this.bodmasService.getNumPadValue();
        this.initGame();
        this.startGame();
    }

    initGame() {
        this.storage.get('bodmas').then((storedValue: IStoredValue) => {
            this.level = storedValue.level;
            this.score = storedValue.score;
            this.totalScore = storedValue.totalScore;
            console.log('storedValue', storedValue);
        });
    }
    startGame() {
        if (this.level === 1 || this.level == 2) {
            this.question = this.getFirstQuery();
        } else if (this.level === 3) {
            this.thirdLevel();
        }
    }

    thirdLevel() {
        this.question = `( ${this.getFirstQuery()} ) ${this.bodmasService.getSymbol(this.level).value} ( ${this.getFirstQuery()} )`;
        this.expectedOutput = (new Function('return ' + this.question))();
        console.log("question", this.question);
        console.log((new Function('return ' + this.question))());
    }

    getFirstQuery() {
        const operation = this.bodmasService.getSymbol(this.level);
        let value1 = this.bodmasService.getRandomValue(this.level);
        let value2 = this.bodmasService.getRandomValue(this.level);
        if ((operation.value === '/' || operation.value === '-') && value1 < value2) {
            const tempValue = value1;
            value1 = value2;
            value2 = tempValue;
        }
        return `${value1} ${operation.value} ${value2}`;
    }

    onClear(event?) {
        this.output = '';
        this.status = '';
        this.isCorrect = false;
    }

    onReset(event?) {
        this.onClear();
        this.startGame();
    }

    onNewGame(event) {
        this.level = 0;
        this.score = 0;
        this.totalScore = 0;
        this.storeGameValues();
        this.onReset();
    }

    onNumClick(value) {
        this.output += value;
        this.isCorrect = parseInt(this.output) === this.expectedOutput;
        console.log("this.isCorrect", this.isCorrect);
        this.status = this.isCorrect ? 'pass' : 'fail';
        this.cdr.detectChanges();
        if (this.isCorrect) {
            this.score += this.scoreValue[this.level - 1];
            this.totalScore += this.scoreValue[this.level - 1];
            this.updateLevel();
            setTimeout(() => { this.onReset(); }, 300);
        }
    }

    updateLevel() {
        if (this.level === 1 && this.score >= this.sucessScore[this.level - 1]) {
            this.onLevelCleared();
        } else if (this.level === 2 && this.score >= this.sucessScore[this.level - 1]) {
            this.onLevelCleared();
        } else if (this.level === 3 && this.score >= this.sucessScore[this.level - 1]) {
            this.onLevelCleared();
        }
        this.storeGameValues();
    }

    onLevelCleared() {
        this.level++;
        this.score = 0;
        const modal = this.modalCtrl.create(SucessComponent, { level: this.level });
        modal.present();
    }

    storeGameValues() {
        this.storage.set('bodmas', { level: this.level, score: this.score, totalScore: this.totalScore });
    }
}
