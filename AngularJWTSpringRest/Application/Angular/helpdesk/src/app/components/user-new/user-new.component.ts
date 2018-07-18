import { UserService } from './../../services/user.service';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseApi } from '../../model/response-api.model';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  @ViewChild("form")
  form: NgForm

  public user: User = new User('', '', '', '');
  public shared: SharedService;
  public message: {};
  public classCss: {};

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.shared = SharedService.getInstance();
   }

  ngOnInit() {
    let id : string = this.route.snapshot.params['id'];
    if(id != undefined){
      this.findById(id);
    }
  }

  findById(id: string){
    this.userService.findById(id).subscribe((resposeApi:ResponseApi) => {
      this.user = resposeApi.data;
      this.user.password = '';
     
    }, error => {
      this.showMessage({
        type : 'error',
        text : error['error']['errors'][0]
      });
    });
  }

  register(){
    this.message = {};
    this.userService.createOrUpdate(this.user).subscribe((responseApi: ResponseApi) => {
      this.user = new User('', '', '', '');
      let userReturned : User = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type : 'success',
        text : `User '${userReturned.email}' registered successfully! `
      });
    }, error => {
      this.showMessage({
        type : 'error',
        text : error['error']['errors'][0]
      });
    });
  }

  private showMessage(message: {type: string, text: string} ): void {
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

  getFormGroupClass(isInvalid: boolean, isDirty: boolean ): {} {
    return{
      'form-group' : true,
      'has-error' : isInvalid && isDirty,
      'has-success' : !isInvalid && isDirty
    };
  }

  cancelRegister(){
    this.user = new User('', '', '', '');
    this.message = {};
    this.classCss = {};
    this.router.navigate(['/']);
  }
}
