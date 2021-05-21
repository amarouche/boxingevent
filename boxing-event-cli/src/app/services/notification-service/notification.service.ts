import {Injectable, ViewChild} from '@angular/core';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {
  }

  showSuccess(message, title) {
    this.toastr.success(message, title);
  }

  showError(message, title) {
    this.toastr.error(message, title);
  }

  showFormError(error) {
    if (error.code === 400) {
      this.toastr.error(error.error, 'Erreur', {
        timeOut: 6000,
        tapToDismiss: true,
      //  positionClass: 'toast-relative-position',
        toastClass: 'form-toast'
      });
    }
  }
}
