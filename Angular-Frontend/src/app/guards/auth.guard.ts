import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url:string=state.url;
    let val:any=localStorage.getItem('isUserLoggedIn');
    let loggedInUser:any=JSON.parse(localStorage.getItem('loginUser') || '');

    if(val=='true'){
      if(route.data['roles'] && route.data['roles'].indexOf(loggedInUser.type)=== -1){
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login'],{queryParams:{returnUrl:url}});
    return false;
      
  }

  checkType(url:string):any{
    let val:any=localStorage.getItem('isUserLoggedIn');
    let loggedInUser:any=JSON.parse(localStorage.getItem('loginUser') ||'');
  }
  
}
