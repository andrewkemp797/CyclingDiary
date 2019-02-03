import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const jwtToken = localStorage.getItem('jwt');
        //set auth header
        if (jwtToken) {
            const bearer = 'Bearer ' + jwtToken;
            const apiRequest = req.clone({ setHeaders: { Authorization: bearer } });
            return next.handle(apiRequest);
        }
        //if no JWT token available, it means we are contacting server for token
        //pass original request and do not modify
        return next.handle(req);
    }
}