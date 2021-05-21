import {Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
// import {User} from '../../../models/user';
// import {UserService} from '../../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
// import {AuthService} from '../../../service/auth.service';


@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

    // constructor(private service: UserService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    // }

    // user: any;
    // id: number;
    // currentUserId: number;

    ngOnInit() {
        // this.id = +this.route.snapshot.paramMap.get('id');
        // this.service.getUser(this.id).subscribe((result: User) => {
        //     this.user = result;
        // });
        // console.log(this.user);
    }


    // delete() {
    //     this.service.getCurrentUser().subscribe(result => {
    //         this.currentUserId = result.id;
    //         if (this.currentUserId === this.id) {
    //             this.service.deleteUser(this.id).subscribe();
    //             this.authService.removeToken();
    //             // console.log(this.authService.getToken());
    //             this.router.navigateByUrl('/login');
    //         } else {
    //             this.service.deleteUser(this.id).subscribe();
    //             this.router.navigateByUrl('/users');
    //         }
    //     });
    // }
}
