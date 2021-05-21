import {Component, OnInit, ViewChild, AfterViewInit, OnChanges} from '@angular/core';
import {UserService} from 'src/app/services/user-service/user.service';
import {MatTableDataSource, MatPaginator, MatSort, PageEvent} from '@angular/material';
import {IBoxerDetail, IUserType, User} from 'src/app/models/user';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState, selectAuthState} from '../../../../store/app.states';

@Component({
  selector: 'app-user',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit, OnChanges {

  dataSource = new MatTableDataSource([]);
  users: User[] = [];
  user;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.store.select(selectAuthState).subscribe((state: any) => this.user = state.user);
  }

  displayedColumns: string[] = [
    // 'first_name',
    // 'last_name',
    // 'id',
    'firstName',
    'lastName',
    'email',
    'type',
    'weight',
    'height',
    'actions',
  ];

  length: number;
  pageSize: number;
  offset: number;
  pageEvent: PageEvent;
  isAdmin: boolean;
  currentUserId: number;

  ngOnInit() {
    this.offset = this.route.snapshot.queryParamMap.get('offset') ? +this.route.snapshot.queryParamMap.get('offset') : 0;
    this.pageSize = this.route.snapshot.queryParamMap.get('pageSize') ? +this.route.snapshot.queryParamMap.get('pageSize') : 20;
    this.loadUsers();
    this.dataSource.paginator = this.paginator;
    // console.log(this.user.role);
    // this.service.getCurrentUser().subscribe(resut => {
    //     this.currentUserId = resut.id;
    //     if (resut.role.name !== 'ROLE ADMIN') {
    //         this.isAdmin = false;
    //     } else {
    //         this.isAdmin = true;
    //     }
    // });
    // console.log('ds');
    // this.dataSource = new MatTableDataSource(this.users);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    this.offset = this.route.snapshot.queryParamMap.get('offset') ? +this.route.snapshot.queryParamMap.get('offset') : 0;
    this.pageSize = this.route.snapshot.queryParamMap.get('pageSize') ? +this.route.snapshot.queryParamMap.get('pageSize') : 20;
    this.loadUsers();
    this.dataSource.paginator = this.paginator;

  }

  loadUsers(): void {
    this.service.getUsers().subscribe((result: User[]) => {
      // console.log('dd', result);

      this.fillData(result);
      this.dataSource.sort = this.sort;
    });
    // console.log('dd', this.users);
    // this.users = this.service.getUsers();
  }

  private fillData(users: User[]) {
    const data: any[] = [];
    users.forEach((user: User) => data.push(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        type: user.type.name,
        weight: user.detail ? user.detail.weight : 'N/C',
        height: user.detail ? user.detail.height : 'N/C',

        // email?: string;
        // role: user.role.name,
        // createdDate: user.creationDate,
        // updatedDate: user.updatedDate,
      }
    ));
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  delete(id: number) {
    this.service.deleteUser(id).subscribe(result => {
      this.offset = this.route.snapshot.queryParamMap.get('offset') ? +this.route.snapshot.queryParamMap.get('offset') : 0;
      this.pageSize = this.route.snapshot.queryParamMap.get('pageSize') ? +this.route.snapshot.queryParamMap.get('pageSize') : 20;
      this.loadUsers();
      this.dataSource.paginator = this.paginator;
    });
  }
}

