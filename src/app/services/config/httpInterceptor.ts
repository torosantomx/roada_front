import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoadingScreenService } from "@services/loading-screen.service";
import { catchError, finalize, throwError } from "rxjs";

let activePetitions: number = 0;
let lodingDisplayed: boolean = false;
let anyError: boolean = false;


export const httpInterceptor: HttpInterceptorFn = (req, next) => {
    let loadingScreenService = inject(LoadingScreenService);
    //   let messageService = inject(MessageService);
    //   let sessionService = inject(SessionService);


    if (!lodingDisplayed) {
        loadingScreenService.showLoadingScreen();
        lodingDisplayed = true;
    }
    let headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
    //   if (sessionService.isLoggedIn) {
    //     headers = headers.append('Authorization', `Bearer ${sessionService.token}`);
    //   }

    const clonReq = req.clone({
        headers
    });

    activePetitions++;
    return next(clonReq).pipe(
        finalize(() => {
            activePetitions--;
            if (activePetitions == 0) {
                loadingScreenService.closeModal();
                lodingDisplayed = false;
                anyError = false;
            }
        }),
        catchError((error: HttpErrorResponse) => {
            if (!anyError) {
                if (error.status === 0) {
                    anyError = true;
                    //   messageService.showMessage('Server error. Contact support');
                }
                else {
                    if (error.error.status === 401) {
                        anyError = true;
                        // messageService.showMessage('Check your credentials', 'Something went wrong');
                    }
                }
            }
            return throwError(() => new Error(error.message));
        })
    );
};
