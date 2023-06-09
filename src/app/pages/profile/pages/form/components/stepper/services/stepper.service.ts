import {Injectable} from "@angular/core";
import {filter, Observable, Subject} from "rxjs";


export interface Step {
  key: string;
  label: string;
}

export interface ActiveStep extends Step {
  index: number;
}

// @ts-ignore
@Injectable()
export class StepperService {
  steps: Step[];
  activeStep: ActiveStep;

  next = new Subject<boolean>();
  next$: Observable<boolean>;

  prev = new Subject<void>();
  prev$ = this.prev.asObservable();

  complete = new Subject<boolean>();
  // complete$: Observable<boolean>;
  complete$ = this.complete.asObservable();

  cancel = new Subject<void>();
  cancel$ = this.cancel.asObservable();

  check = new Subject<'next' | 'complete'>();
  check$ = this.check.asObservable();


  constructor() {
    this.next$ = this.next.asObservable().pipe(
      filter(isOk => isOk)
    );
    // this.complete$ = this.complete.asObservable().pipe(
    //   filter(isOk => isOk)
    // )
    //this.complete$ = this.complete.asObservable();    //TODO:
  }

  init(steps: Step[]) {
    this.steps = steps;
    this.activeStep = {
      ...steps[0],
      index: 0,
    }
  }
  onNext(): void {
    const index = this.activeStep.index + 1;
    this.activeStep = {
      ...this.steps[index],
      index
    }
  }
  onPrev(): void {
    const index = this.activeStep.index - 1;
    this.activeStep = {
      ...this.steps[index],
      index
    }
  }
}
