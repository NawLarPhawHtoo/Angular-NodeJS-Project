import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  userDetails$: Observable<User> | any;
  userDetails: User = {} as User;
  selectedId: any;
  formData!: FormGroup;
  dialogRef: any;
  data: any;
  imgFile: any;
  _id: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userDetails$ = this.route.paramMap.pipe(
      switchMap(params => {
        console.log(params);
        this.selectedId = params.get('id');
        console.log(this.selectedId);
        return this.userService.findUser(this.selectedId);
      })
    );
    this.userDetails$.subscribe((res: any) => {
      this.userDetails = res.data;
      console.log(this.userDetails);
      // const name=this.userDetails.name;
      // const email=this.userDetails.email;
      // const password=this.userDetails.password;
      // const birthday=this.userDetails.birthday;
      // const type=this.userDetails.type;
      // const profile=this.userDetails.profile;
      // const phone=this.userDetails.phone;
      // const gender=this.userDetails.gender;
      // const address=this.userDetails.address;
      // const skills=this.userDetails.skill;
      // const experience=this.userDetails.experience;
    });
  }
  goToList() {
    this.router.navigate(['/user-list']);
  }

  goToEdit(id: any) {
    this.router.navigate(['/user-edit', id]);
  }
}
