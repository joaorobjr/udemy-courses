
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { SharedService } from "../../services/shared/shared.service";
import { Observable } from "../../../../node_modules/rxjs";
import { Injectable } from "../../../../node_modules/@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    public shared: SharedService

    constructor(){
        this.shared = SharedService.getInstance();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authRequest: any;

        if(this.shared.isLoggedIn()){
            authRequest = req.clone({
                setHeaders : {
                    'Authorization' : this.shared.token
                }
            });
            return next.handle(authRequest);
        }else{
            return next.handle(req);
        }
    }
}