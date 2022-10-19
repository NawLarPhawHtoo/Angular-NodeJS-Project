import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }],
})
export class UserEditComponent implements OnInit {
  basic: any;
  contact: any;
  education: any;
  // basic: any;
  // contact: any;
  // education: any;
  // activateRoute: any;

  constructor(
    private dialogRef: MatDialogRef<UserEditComponent>,
    private userService: UserService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: UserEditComponent
  ) {}

  typeOption = [{ enum: 'Admin' }, { enum: 'User' }];

  profileImage: any = `http://localhost:8000/${this.data.profile}` || '';

  isLinear = false;
  imgFile: any;
  confirmView: Boolean = false;
  _id: any;
  pickDate: any;
  today = new Date();

  
  gender = [{ enum: 'Male' }, { enum: 'Female' }, { enum: 'Other' }];

  
  skills = [{ enum: 'Programming' }, { enum: 'Language' }, { enum: 'Others' }];

  experiences = [
    { enum: '1 year under' },
    { enum: '1 year' },
    { enum: '1 year above' },
  ];

  profile = new FormControl('', Validators.required);
  // name = new FormControl('', Validators.required);
  // type = new FormControl('');
  // phone = new FormControl('');
  // email = new FormControl('', [Validators.required, Validators.email]);
  // birthday = new FormControl('');
  // gender=new FormControl('');
  // address = new FormControl('');
  // basic=new FormControl('');
  // contact=new FormControl('');
  // education=new FormControl('');
  isProfile = localStorage.getItem('isProfile');

  formData!: FormGroup;
  // firstFormGroup!: FormGroup;
  // secondFormGroup!: FormGroup;

  ngOnInit(): void {
    // const id: string = this.activateRoute.snapshot.params['id'];
    
    console.log(this.data);
    const id=this.data._id;
    console.log(id);
    const name=this.data.basic.name;
    console.log(name);
    const email=this.data.basic.email;
    const password=this.data.basic.password;

    const birthday=this.data.contact.birthday;
    const gender=this.data.contact.gender;
    const phone=this.data.contact.phone;
    const address=this.data.contact.address;
    const type=this.data.contact.type;

    const skill=this.data.education.skill;
    const experience=this.data.education.experience;


    this.profileImage = `http://localhost:8000/${this.data.profile}` || '';

    this.formData = this.fb.group({
      profile: this.fb.control(this.imgFile),

      basic: this.fb.group({
        name: this.fb.control(name),
        email: this.fb.control(email),
        password: this.fb.control(password),
        // confirmPwd: this.fb.control('', Validators.required),
      }),
      contact: this.fb.group({
        birthday: this.fb.control(birthday),
        gender: this.fb.control(gender),
        type: this.fb.control(type),
        phone: this.fb.control(phone),
        address: this.fb.control(address),
      }),
      education: this.fb.group({
        skill: this.fb.control(skill),
        experience: this.fb.control(experience),
      }),
    });

    // this.userService.findUser(id).subscribe(res=>{
    //   console.log(res);
    // })
    // this.formData=new FormGroup({
    //   name:new FormControl(this.data.basic.name),
    //   email:new FormControl(this.data.basic.email),
    //   password:new FormControl(this.data.basic.password),

    //   birthday:new FormControl(this.data.contact.birthday),
    //   gender:new FormControl(this.data.contact.gender),
    //   type:new FormControl(this.data.contact.type),
    //   phone:new FormControl(this.data.contact.phone),
    //   address:new FormControl(this.data.contact.address),

    //   skill:new FormControl(this.data.education.skill),
    //   experience:new FormControl(this.data.education.experience),
    // });

    // this.userUpdateForm = new FormGroup({

    // profile: new FormControl('')

    // contact:this.fb.group({

    //   name: this.fb.control('', Validators.required),
    //   email: this.fb.control('', Validators.required),
    //   password: this.fb.control('', Validators.required),
    //   // confirmPwd: this.fb.control('', Validators.required),

    // }),
    // contact:this.fb.group({
    //   birthday:this.fb.control(''),
    //   gender: this.fb.control(''),
    //   type: this.fb.control(''),
    //   phone: this.fb.control(''),
    //   address: this.fb.control(''),

    // }),
    // education:this.fb.group({
    //   skill:this.fb.control('', Validators.required),
    //   experience:this.fb.control('', Validators.required),
    // }),

    // basic:new FormControl(this.data.basic),
    // contact:new FormControl(this.data.contact),
    // education:new FormControl(this.data.education),
    // name: new FormControl(this.data.name, Validators.required),
    // type: new FormControl(this.data.type),
    // phone: new FormControl(this.data.phone),
    // email: new FormControl(this.data.email, [Validators.required, Validators.email]),
    // birthday: new FormControl(this.data.birthday),
    // gender: new FormControl(this.data.gender),
    // address: new FormControl(this.data.address)
    // });
  }

  onClickUpdateUser() {
    //   if (this.confirmView == true) {
    const id = this.data._id;
    console.log(id);
    const formData = new FormData();
    formData.append('name', this.data.basic.name);
    formData.append('email', this.data.basic.email);
    formData.append('password', this.data.basic.password);
    formData.append('birthday', this.data.contact.birthday);
    formData.append('gender', this.data.contact.gender);
    formData.append('address', this.data.contact.address);
    formData.append('type', this.data.contact.type);
    formData.append('phone', this.data.contact.phone);
    formData.append('experience', this.data.education.experience);
    formData.append('skill', this.data.education.skill);
    formData.append('profile', this.data.imgFile);

    this.userService.updateUser(id, formData).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('/user-list');
    });
  

    // formData.append('profile', this.imgFile);

    //  formData.append('name', this.formData.controls['name'].value);
    //  formData.append('email', this.formData.controls['email'].value);
    //  formData.append('password', this.formData.controls['password'].value);
    //    formData.append('birthday',this.formData.controls['birthday'].value);
    //    formData.append('gender', this.formData.controls['gender'].value);
    //    formData.append('address',this.formData.controls['address'].value);
    //    formData.append('type', this.formData.controls['type'].value);
    //    formData.append('phone', this.formData.controls['phone'].value);
    //    formData.append('experience', this.formData.controls['experience'].value);
    //    formData.append('skill', this.formData.controls['skill'].value);

    // formData.append('name', this.formData.controls['basic'].value);
    // formData.append('type', this.formData.controls['contact'].value);
    // formData.append('phone', this.formData.controls['contact'].value);
    // formData.append('email', this.formData.controls['basic'].value);
    // formData.append('birthday', this.formData.controls['contact'].value);
    // formData.append('gender', this.formData.controls['contact'].value);
    // formData.append('address', this.formData.controls['contact'].value);
    // formData.append('basic', this.formData.controls['basic'].value);
    // formData.append('contact', this.formData.controls['contact'].value);
    // formData.append('education', this.formData.controls['education'].value);

    // //   console.log(formData)
    // this.userService.updateUser(id, formData).subscribe((res) => {
    //   // this.dialogRef.close('update');
    //   console.log(res);
    // });
  }

  // if (this.formData.valid) {
  //   this.formData.controls['profile'].disable();
  //   this.formData.controls['basic'].disable();
  //   this.formData.controls['contact'].disable();
  //   this.formData.controls['education'].disable();
  // this.formData.controls['name'].disable();
  // this.formData.controls['type'].disable();
  // this.formData.controls['phone'].disable();
  // this.formData.controls['email'].disable();
  // this.formData.controls['birthday'].disable();
  // this.formData.controls['gender'].disable();
  // this.formData.controls['address'].disable();
  //     this.confirmView = true;
  //   }
  // }

  // public onClear() {
  //   if (this.confirmView === true) {
  //     this.formData.controls['profile'].enable();
  //     this.formData.controls['name'].enable();
  //     this.formData.controls['type'].enable();
  //     this.formData.controls['phone'].enable();
  //     this.formData.controls['email'].enable();
  //     this.formData.controls['birthday'].enable();
  //     this.formData.controls['gender'].enable();
  //     this.formData.controls['address'].enable();
  //     this.confirmView = false;
  //   } else {
  //     this.formData.reset();
  //   }
  // }

  get basicForm() {
    return this.formData.get('basic') as FormGroup;
  }

  get contactForm() {
    return this.formData.get('contact') as FormGroup;
  }

  get educationForm() {
    return this.formData.get('education') as FormGroup;
  }

  // updateUser(){

  //   console.log(this.userUpdateForm.value);

  //   let param: any = {...this.userUpdateForm.value};
  //   console.log('param', param);

  //   let data = new FormData();
  //   data.append('name', param.basic?.name);
  //   data.append('email', param.basic?.email);
  //   data.append('password', param.basic?.password);
  //   data.append('birthday', param.contact?.birthday);
  //   data.append('gender', param.contact?.gender);
  //   data.append('address', param.contact?.address);
  //   data.append('type', param.contact?.type);
  //   data.append('phone', param.contact?.phone);
  //   data.append('experience', param.education?.experience);
  //   data.append('skill', param.education?.skill);
  //   data.append('profile', this.imgFile);

  //   this.userService.createUser(data).subscribe(res=>{
  //     console.log(res);

  //     this.router.navigateByUrl('/user-list');
  //   })

  // }

  imageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      this.imgFile = file;
      console.log(this.imgFile);
      const reader = new FileReader();
      reader.onload = (e) => (this.profileImage = reader.result);
      reader.readAsDataURL(file);
    }
  }

  get myForm() {
    return this.formData.controls;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  };

  OnDateChange(event: any) {
    this.pickDate = event;
  }

  onCancelClick(): void {
    // this.dialogRef.close();
  }
}
