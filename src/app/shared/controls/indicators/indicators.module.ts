import {NgModule} from "@angular/core";
import {SpinnerModule} from "@app/shared/controls/indicators/spinner/spinner.module";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [],
  imports: [
    CommonModule
    ,SpinnerModule,],
  exports: [SpinnerModule]
})
export class IndicatorsModule {}
