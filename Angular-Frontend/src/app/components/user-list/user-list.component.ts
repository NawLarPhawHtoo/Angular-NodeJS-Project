import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit{
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  users: User[] | any = [];
  console = console;
  displayedColumns: string[] = [
    'profile',
    'name',
    'email',
    'birthday',
    'gender',
    'phone',
    'address',
    'actions',
  ];
  dataSource: any;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      console.log(res);
      // this.users=res.data;
      this.dataSource = res.data;
      // console.log(this.users)
    });
  }

  deleteUser(id: any, i: any) {
    console.log(id);
    if (window.confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe((res) => {
        this.users.splice(i, 1);
      });
    }
  }

  public doFilter = (target: any) => {
    this.dataSource.filter = target.value.trim().toLocaleLowerCase();
  };

  openUpdateDialog(element: any) {
    const dialogRef = this.dialog.open(UserEditComponent, { data: element });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'update') this.getUsers();
    });
  }
  openDeleteDialog(element: any) {
    // const dialogRef = this.dialog.open(UserDeleteConfirmDialogComponent, { data: element });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result == 'delete') this.getUsers();
    // })
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserCreateComponent, { width: '700px' });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'create') this.getUsers();
    });
  }
}
