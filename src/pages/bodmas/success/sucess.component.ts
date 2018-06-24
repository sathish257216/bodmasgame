import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';


@Component({
    selector: 'app-bodmas-model',
    templateUrl: 'sucess.component.html'
})

export class SucessComponent {
    level: number = 0;

    constructor(params: NavParams, public navCtrl: NavController) {
        this.level = params.get('level')
    }

    closeModal(event) {
        this.navCtrl.pop();
    }
}
