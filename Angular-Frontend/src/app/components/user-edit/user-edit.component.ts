import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { FormControl,Validators,FormGroup } from '@angular/forms';

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
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ]
})
export class UserEditComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<UserEditComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: UserEditComponent,
  ) { }

  typeOption = [
    { enum: 'Admin' },
    { enum: 'User' }
  ];

  profileImage: any = `http://localhost:8000/${this.data.profile}` || "";
  imgFile: any;
  confirmView: Boolean = false;
  _id: string = '';
  pickDate: any;
  today = new Date();

  profile = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  type = new FormControl('');
  phone = new FormControl('');
  email = new FormControl('', [Validators.required, Validators.email]);
  birthday = new FormControl('');
  gender=new FormControl('');
  address = new FormControl('');
  isProfile = localStorage.getItem("isProfile");

  formData!: FormGroup;
  firstFormGroup!: FormGroup;  
  secondFormGroup!: FormGroup;


  ngOnInit(): void {
    this.profileImage = `http://localhost:8000/${this.data.profile}` || "";
    this.formData = new FormGroup({
      profile: new FormControl(''),
      name: new FormControl(this.data.name, Validators.required),
      type: new FormControl(this.data.type),
      phone: new FormControl(this.data.phone),
      email: new FormControl(this.data.email, [Validators.required, Validators.email]),
      birthday: new FormControl(this.data.birthday),
      gender: new FormControl(this.data.gender),
      address: new FormControl(this.data.address)
    });

  }

  onClickUpdateUser() {
    if (this.confirmView == true) {
      const id = this.data._id;
      const formData = new FormData();
      formData.append('profile', this.imgFile);
      formData.append('name', this.formData.controls['name'].value);
      formData.append('type', this.formData.controls['type'].value);
      formData.append('phone', this.formData.controls['phone'].value);
      formData.append('email', this.formData.controls['email'].value);
      formData.append('birthday', this.formData.controls['birthday'].value);
      formData.append('gender', this.formData.controls['gender'].value);
      formData.append('address', this.formData.controls['address'].value);
  
      console.log(formData)
      this.userService.updateUser(id, formData)
        .subscribe(res => {
          this.dialogRef.close('update');
        });
    }


    if (this.formData.valid) {
      this.formData.controls['profile'].disable();
      this.formData.controls['name'].disable();
      this.formData.controls['type'].disable();
      this.formData.controls['phone'].disable();
      this.formData.controls['email'].disable();
      this.formData.controls['birthday'].disable();
      this.formData.controls['gender'].disable();
      this.formData.controls['address'].disable();
      this.confirmView = true;
    }
  }

  public onClear() {
    if (this.confirmView === true) {
      this.formData.controls['profile'].enable();
      this.formData.controls['name'].enable();
      this.formData.controls['type'].enable();
      this.formData.controls['phone'].enable();
      this.formData.controls['email'].enable();
      this.formData.controls['birthday'].enable();
      this.formData.controls['gender'].enable();
      this.formData.controls['address'].enable();
      this.confirmView = false;
    } else {
      this.formData.reset();
    }
  }

  imageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      this.imgFile = file;
      console.log(this.imgFile);
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

  OnDateChange(event: any) {
    this.pickDate = event;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }


}
