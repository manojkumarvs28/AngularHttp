import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("Request is on its way");
        //if(req.url === 'some req url') // to specify that for specific req/type/or any other req params, 
        //this intercept should be called
        const modifiedReq = req.clone({
            headers: req.headers.append('Auth', 'xyz')
        });
        return next.handle(modifiedReq);
    }

}