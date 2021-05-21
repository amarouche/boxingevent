import {Component, OnInit} from '@angular/core';
// import {FormBuilder, Validators} from '@angular/forms';
// import {Address} from '../../../models/address';
// import {AddressService} from '../../../service/address.service';
// import {ActivatedRoute} from '@angular/router';
// import {User} from '../../../models/user';
// import {UserService} from '../../../service/user.service';
// import {jsdocTransformer} from 'tsickle/src/jsdoc_transformer';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

    // constructor(private service: UserService, private fb: FormBuilder, private route: ActivatedRoute) {
    // }
    //
    // submitted: boolean;
    // error = false;
    // id: number;
    // user: User;
    // userForm;
    // currentUserAdmin: boolean;
    //
    ngOnInit() {
    //     this.id = +this.route.snapshot.paramMap.get('id');
    //     this.service.getUser(this.id).subscribe((result: User) => {
    //         this.user = result;
    //         this.service.getCurrentUser().subscribe(user => {
    //             // this.currentUserAdmin = user.role.name;
    //             if (user.role.name === 'ROLE ADMIN') {
    //                 this.currentUserAdmin = true;
    //             } else {
    //                 this.currentUserAdmin = false;
    //             }
    //             this.initForm();
    //         });
    //
    //     });
    }
    //
    // initForm() {
    //     this.userForm = this.fb.group({
    //         username: [this.user.username, Validators.required],
    //         password: ['', Validators.required],
    //         rePassword: ['', Validators.required],
    //         role: this.user.role.id,
    //     });
    // }
    //
    // get f() {
    //     return this.userForm.controls;
    // }
    //
    // updated() {
    //     this.submitted = true;
    //     const body: any = this.userForm.getRawValue();
    //     if (this.userForm.invalid || body.password !== body.rePassword) {
    //         this.error = true;
    //         this.submitted = false;
    //         return;
    //     }
    //
    //     this.user = {
    //         username: body.username,
    //         password: body.password,
    //         role: body.role,
    //         // updatedDate: new Date()
    //     };
    //     console.log(body, JSON.stringify(this.user));
    //     this.service.updateUser(this.user, this.id).subscribe(result => {
    //         console.log('ok', result);
    //         this.error = false;
    //     }, error => {
    //         console.log('ko', error);
    //         this.error = true;
    //         this.submitted = false;
    //     });
    // }
}
