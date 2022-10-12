import { Component, OnInit,NgZone, Inject } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { FormGroup,FormBuilder, Validators, FormControl} from '@angular/forms';
import { MatDialogRef, MatDialog} from '@angular/material/dialog';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { UserListComponent } from '../user-list/user-list.component';

export const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MMMM YYYY',
    dateAllyLabel: 'LL',
    monthYearAllyLabel: 'MMMM YYYY'
  },
};


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ]
})

export class UserCreateComponent implements OnInit {
 
  constructor(
    public dialogRef: MatDialogRef<UserCreateComponent>,
    public dialog:MatDialog,
    private userService: UserService,
    public fb: FormBuilder,
  ) { }

  typeOption = [
    { enum: 'Admin' },
    { enum: 'User' }
  ];

  profileImage: any;
  imgFile: any;
  confirmView: Boolean = false;
  today = new Date();

  formData!: FormGroup;

  ngOnInit(): void {
    this.formData = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthday: new FormControl(''),
      gender: new FormControl(''),
      type: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl(''),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPwd: new FormControl('', Validators.required),
      profile: new FormControl(''),
    },
    //   {
    //   validator: MustMatch('password', 'confirmPwd')
    // }
    );
  }

  public onClear() {
    if (this.confirmView == true) {
      this.formData.controls['name'].enable();
      this.formData.controls['email'].enable();
      this.formData.controls['password'].enable();
      this.formData.controls['confirmPwd'].enable();
      this.formData.controls['phone'].enable();
      this.formData.controls['birthday'].enable();
      this.formData.controls['gender'].enable();
      this.formData.controls['address'].enable();
      this.formData.controls['type'].enable();
      this.formData.controls['profile'].enable();
      this.confirmView = false;
    } else {
      this.formData.reset();
    }
  }

  onClickAddUser() {
    if (this.confirmView === true) {
      const formData = new FormData();
      formData.append('name', this.formData.controls['name'].value);
      formData.append('email', this.formData.controls['email'].value);
      formData.append('password', this.formData.controls['password'].value);
      formData.append('phone', this.formData.controls['phone'].value);
      formData.append('birthday', this.formData.controls['birthday'].value);
      formData.append('gender', this.formData.controls['gender'].value);
      formData.append('address', this.formData.controls['address'].value);
      formData.append('type', this.formData.controls['type'].value);
      formData.append('profile', this.imgFile);
  
      this.userService.createUser(formData)
        .subscribe(res=> {
          this.dialogRef.close(UserCreateComponent); 
        });
    }

    if (this.formData.valid) {
      this.formData.controls['name'].disable();
      this.formData.controls['type'].disable();
      this.formData.controls['phone'].disable();
      this.formData.controls['email'].disable();
      this.formData.controls['birthday'].disable();
      this.formData.controls['gender'].disable();
      this.formData.controls['address'].disable();
      this.formData.controls['password'].disable();
      this.formData.controls['confirmPwd'].disable();
      this.formData.controls['profile'].disable();
      this.confirmView = true;
    }
  }

  imageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      this.imgFile = file;
      const reader = new FileReader();
      reader.onload = e => this.profileImage = reader.result;
      reader.readAsDataURL(file);
    }
  }

  get myForm() {
    return this.formData.controls;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  }
}
