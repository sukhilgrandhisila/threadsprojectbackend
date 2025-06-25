import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from
'@nestjs/common';
import { Observable, tap, finalize } from 'rxjs';
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
console.log(' [Interceptor] Before Controller');
const now = Date.now();
return next.handle().pipe(
tap((data) => {
console.log(' [Interceptor] After Controller Execution');
console.log(' [Interceptor] Before Response is Sent - Response Data:', data);
}),
finalize(() => {
console.log(` [Interceptor] After Response Sent - Total time: ${Date.now() - now}ms`);
})
);
}
}
