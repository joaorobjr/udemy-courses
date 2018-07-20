import { Injectable } from "@angular/core";

@Injectable()
export class DialogService {

    public message = {};
    public classCss = {};

    public confirm(message: string) {
        return new Promise(resolve => {
            return resolve(window.confirm(message || 'Confirm ?'))
        });
    }

    
}