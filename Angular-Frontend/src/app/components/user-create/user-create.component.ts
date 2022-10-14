import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    monthYearAllyLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }],
})
export class UserCreateComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UserCreateComponent>,
    public dialog: MatDialog,
    private userService: UserService,
    public fb: FormBuilder
  ) {}

  typeOption = [{ enum: 'Admin' }, { enum: 'User' }];

  gender = [{ enum: 'Male' }, { enum: 'Female' }, { enum: 'Other' }];

  skills = [{ enum: 'Programming' }, { enum: 'Language' }, { enum: 'Others' }];

  experiences = [
    { enum: '1 year under' },
    { enum: '1 year' },
    { enum: '1 year above' },
  ];

  profileImage: any;
  imgFile: any;
  confirmView: Boolean = false;
  today = new Date();

  formData!: FormGroup;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  ngOnInit(): void {
    // this.formData = this.fb.group({
    //   name: new FormControl('', Validators.required),
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   birthday: new FormControl(''),
    //   gender: new FormControl(''),
    //   type: new FormControl(''),
    //   phone: new FormControl(''),
    //   address: new FormControl(''),
    //   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //   confirmPwd: new FormControl('', Validators.required),
    //   profile: new FormControl(''),
    // },
    // );
    this.firstFormGroup = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPwd: new FormControl('', Validators.required),
      profile: new FormControl(''),
    });
    this.secondFormGroup = this.fb.group({
      birthday: new FormControl(''),
      gender: new FormControl(''),
      type: new FormControl(''),
      phone: new FormControl(''),
      address: new FormControl(''),
    });

    this.thirdFormGroup = this.fb.group({
      skill: new FormControl(''),
      experience: new FormControl(''),
    });
  }

  // public onClear() {
  //   if (this.confirmView == true) {
  //     this.firstFormGroup.controls['name'].enable();
  //     this.firstFormGroup.controls['email'].enable();
  //     this.firstFormGroup.controls['password'].enable();
  //     this.firstFormGroup.controls['confirmPwd'].enable();
  //     this.firstFormGroup.controls['profile'].enable();
  //     this.secondFormGroup.controls['phone'].enable();
  //     this.secondFormGroup.controls['birthday'].enable();
  //     this.secondFormGroup.controls['gender'].enable();
  //     this.secondFormGroup.controls['address'].enable();
  //     this.secondFormGroup.controls['type'].enable();
  //     this.thirdFormGroup.controls['skill'].enable();
  //     this.thirdFormGroup.controls['experience'].enable();

  ///   } else {     this.confirmView = false;

  //     this.firstFormGroup.reset();
  //     this.secondFormGroup.reset();
  //     this.thirdFormGroup.reset();
  //   }
  // }

  onClickAddUser() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.thirdFormGroup.value);

    const data: any = {...this.firstFormGroup.value, ...this.secondFormGroup.value, ...this.thirdFormGroup.value};
    console.log(data);

    this.userService.createUser(data).subscribe(res=> {
      this.dialogRef.close('create');
    });



    if (this.firstFormGroup.valid) {
      this.firstFormGroup.controls['name'].disable();
      this.firstFormGroup.controls['password'].disable();
      this.firstFormGroup.controls['confirmPwd'].disable();
      this.firstFormGroup.controls['profile'].disable();
      this.confirmView = true;
    }
    if (this.secondFormGroup.valid) {
      this.secondFormGroup.controls['phone'].disable();
      this.secondFormGroup.controls['birthday'].disable();
      this.secondFormGroup.controls['gender'].disable();
      this.secondFormGroup.controls['address'].disable();
      this.secondFormGroup.controls['type'].disable();
      this.confirmView = true;
    }
    if (this.thirdFormGroup.valid) {
      this.thirdFormGroup.controls['skill'].disable();
      this.thirdFormGroup.controls['experience'].disable();
      this.confirmView = true;
    }
  }

  getInfo() {
    const formData1 = new FormData();
    formData1.append('profile', this.imgFile);
    formData1.append('name', this.firstFormGroup.controls['name'].value);
    formData1.append('email', this.firstFormGroup.controls['email'].value);
    formData1.append(
      'password',
      this.firstFormGroup.controls['password'].value
    );

    this.getSecondForm();
  }

  getSecondForm() {
    const formData2 = new FormData();
    formData2.append('phone', this.secondFormGroup.controls['phone'].value);
    formData2.append(
      'birthday',
      this.secondFormGroup.controls['birthday'].value
    );
    formData2.append('gender', this.secondFormGroup.controls['gender'].value);
    formData2.append('address', this.secondFormGroup.controls['address'].value);
    formData2.append('type', this.secondFormGroup.controls['type'].value);

    this.getThirdForm();
  }
  getThirdForm() {
    const formData3 = new FormData();
    formData3.append('skill', this.thirdFormGroup.controls['skill'].value);
    formData3.append(
      'experience',
      this.thirdFormGroup.controls['experience'].value
    );
  }

  imageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      this.imgFile = file;
      const reader = new FileReader();
      reader.onload = (e) => (this.profileImage = reader.result);
      reader.readAsDataURL(file);
    }
  }

  get myForm() {
    return (
      this.firstFormGroup.controls ||
      this.secondFormGroup.controls ||
      this.thirdFormGroup.controls
    );
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.firstFormGroup.controls[controlName].hasError(errorName);
  };
}
