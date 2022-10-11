import { Component, OnInit,NgZone } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder, Validators, FormControl} from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  submitted: boolean = false;
  userForm!: FormGroup

  constructor(public fb:FormBuilder,private router:Router,private ngZone:NgZone,private userService:UserService) { 
    this.mainForm();
  }

  
  ngOnInit(): void {}

  mainForm(){
    this.userForm = this.fb.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password:['',[Validators.required]],
      phone:['',[Validators.required]],
      birthday:['',[Validators.required]],
      gender:['',[Validators.required]],
      address:[''],
      type:['',[Validators.required]],
      profile:['',[Validators.required]]

    });

  }

  get myForm(){
    return this.userForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(!this.userForm.valid){
      return false;
    }else{
      return this.userService.createUser(this.userForm.value).subscribe({
        complete:()=>{
          console.log('User created successfully!'),
          this.ngZone.run(()=> this.router.navigateByUrl('/user-list'));
        },error:(e)=>{
          console.log(e);
        }

      })
    }

  }

}
