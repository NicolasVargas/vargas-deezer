import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

// WILL ONLY BE INJECTED IN DEV

export class CorsInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const newUrl = request.url.replace('https://api.deezer.com/', '/api/');
        const updatedRequest = request.clone({ url: newUrl });
        return next.handle(updatedRequest);
    }
}
