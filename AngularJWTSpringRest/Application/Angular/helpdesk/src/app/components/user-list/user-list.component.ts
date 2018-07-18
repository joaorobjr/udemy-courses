import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DialogService } from '../../services/dialog.service';
import { Router } from '@angular/router';
import { ResponseApi } from '../../model/response-api.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public page: number = 0;
  public count: number = 5;
  public pages: Array<number>;
  public shared: SharedService;
  /*public message: {};
  public classCss: {};*/
  public listUser = [];

  constructor(private dialogService: DialogService, private userService: UserService, private router: Router) {
    this.shared = SharedService.getInstance();
   }

  ngOnInit() {
    this.findAll(this.page, this.count);
  }

  findAll(page: number, count: number){
    this.userService.findAll(page, count).subscribe((responseApi: ResponseApi) => {
      this.listUser = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages']);
    }, error => {
      this.dialogService.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      });
    });
  }

  edit(id:string){
    this.router.navigate(['/user-new', id]);
  }

  delete(id:string){
    this.dialogService.confirm('Do you want to delete the user?').then((canDelete: boolean) =>{
      if(canDelete){
        this.dialogService.message = {};
        this.userService.delete(id).subscribe((responseApi: ResponseApi) => {
          this.dialogService.showMessage({
            type: 'success',
            text: 'User deleted successfully!'
          })
          this.findAll(this.page, this.count);
        }, error => {
          this.dialogService.showMessage({
            type: 'error',
            text: error['error']['errors'][0]
          });
        });
      }
    });
  }

  setNextPage(event:any){
    event.preventDefault();
    if(this.page+1 < this.pages.length){
      this.page++;
      this.findAll(this.page, this.count);
    }
  }

  setPreviousPage(event:any){
    event.preventDefault();
    if(this.page > 0){
      this.page--;
      this.findAll(this.page, this.count);
    }
  }

  setPage(num_page:number, event:any, ){
    event.preventDefault();
    this.page = num_page;
    this.findAll(this.page, this.count);
  }
}