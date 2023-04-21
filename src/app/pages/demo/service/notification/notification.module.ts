import {ModuleWithProviders, NgModule} from "@angular/core";
import {NotificationComponent} from "@app/pages/demo/service/notification/components";
import {CommonModule} from "@angular/common";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NotificationService} from "@app/pages/demo/service/notification/notification.service";


@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule,
        MatSnackBarModule],
})
export class NotificationModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NotificationModule,
      providers: [NotificationService],
    }
  }
}
