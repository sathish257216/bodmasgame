import { Injectable } from '@angular/core';
import { ISymbol } from './bodmas.model';

@Injectable()
export class BodmasService {
    private randomValue = [9, 99, 9, 99];
    private symbol: ISymbol[] = [
        { label: 'Multiplication', value: '*' },
        { label: 'Addition', value: '+' },
        { label: 'Subtraction', value: '-' },
        { label: 'Division', value: '/' },
    ];

    constructor() { }

    getNumPadValue(): number[] {
        const numberPad = []
        for (let i = 0; i < 10; i++) {
            numberPad.push(i);
        }
        numberPad.push("-");
        return numberPad;
    }

    getRandomValue(level: number): number {
        return Math.round(Math.random() * this.randomValue[level - 1]);
    }

    getSymbol(level): ISymbol {
        if (level < 3) {
            return this.symbol[Math.round(Math.random() * 3)];
        }
        const randomValue = Math.round(Math.random() * 2);
        return this.symbol[randomValue];
    }
}
