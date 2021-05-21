import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, selectClubState} from '../../../store/app.states';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {AddClub} from '../../../store/actions/club.actions';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.component.html',
  styleUrls: ['./add-club.component.css']
})
export class AddClubComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

  registerClubForm: FormGroup;
  submitted = false;
  clubState: Observable<any>;

  constructor(private store: Store<AppState>,
              private formBuilder: FormBuilder,
              private cd: ChangeDetectorRef,
              private toastr: ToastrService) {
    this.clubState = this.store.select(selectClubState);
  }

  ngOnInit() {
    this.toastr.overlayContainer = this.toastContainer;
    this.clubState.subscribe((state) => {
      this.closeModal();
    });
    this.initRegisterClubForm();
  }

  onClubSubmit(): void {
    this.submitted = true;
    if (this.registerClubForm.invalid) {
      return;
    }
    const payload = this.registerClubForm.getRawValue();
    this.store.dispatch(new AddClub(payload));
  }

  initRegisterClubForm() {
    this.registerClubForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.minLength(5)]],
      // logo: [null]
    });
  }

  get f() {
    return this.registerClubForm.controls;
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.registerClubForm.patchValue({
          file: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  closeModal() {
    if (this.registerClubForm && this.registerClubForm.valid) {
      $('#addClubModal').modal('hide');
    }
  }

}
