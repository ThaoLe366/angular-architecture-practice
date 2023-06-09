import {Component, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {StepperService} from "@app/pages/profile/pages/form/components/stepper/services";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit{
  private  destroy = new Subject();
  constructor(private stepper: StepperService) {
  }
  ngOnInit() {
    this.stepper.next$.pipe(
      takeUntil(this.destroy)
    ).subscribe(() => this.stepper.onNext()); //TODO: ??
  }

  ngOnDestroy() {
    this.destroy.next('');
    this.destroy.complete();
  }

  get steps() {
    return this.stepper.steps;
  }

  get activeStep() {
    return this.stepper.activeStep;
  }

  isActive(index: number): boolean {
    return index === this.activeStep.index
  }

  isCompleted(index: number): boolean {
    return index < this.activeStep.index;
  }

  isFirst(): boolean {
    return this.activeStep.index === 0;
  }
  isLast(): boolean {
    return this.activeStep.index === this.steps.length - 1;
  }
  onNext() {
    this.stepper.check.next('next');
  }
  onComplete() {
    this.stepper.check.next('complete');
    this.stepper.complete.next(true); //TODO: clear
  }
  onCancel() {
    this.stepper.cancel.next();
  }
  onPrev() {
    this.stepper.onPrev();
  }

}
