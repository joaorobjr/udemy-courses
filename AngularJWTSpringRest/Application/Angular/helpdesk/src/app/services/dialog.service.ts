import { Injectable } from "@angular/core";

@Injectable()
export class DialogService{

    public message = {};
    public classCss = {};

    public confirm(message: string){
        return new Promise( resolve => {
            return resolve(window.confirm(message || 'Confirm ?'))
        });
    }

    public showMessage(message: {type: string, text: string} ): void {
        this.message = message;
        this.buildClasses(message.type);
        setTimeout(() => {
          this.message = undefined;
        }, 3000);
      }
    
      private buildClasses(type: string):void{
        this.classCss = {
            'alert' : true
        }
        this.classCss['alert-'+type] = true;
      }
    
}