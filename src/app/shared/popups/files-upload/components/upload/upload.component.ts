import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {
  finalize,
  firstValueFrom,
  from,
  lastValueFrom,
  Observable,
  of,
  Subject,
  switchAll,
  switchMap,
  takeUntil, tap
} from "rxjs";
import firebase from "firebase/compat/app";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy{
  @Input() file: File;

  @Output() complete = new EventEmitter<string>();

  task: AngularFireUploadTask;

  percentage$: Observable<number>;
  snapshot$: Observable<firebase.storage.UploadTaskSnapshot>;
  downloadURL: string;

  private destroy = new Subject<void>();

  constructor(private storage: AngularFireStorage) {
  }
  ngOnInit() {
    this.startUpload();
  }
  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  startUpload(): void {
    const path = `${this.file.type.split('/')[0]}/${Date.now()}_${this.file.name}`;
    const storageRef = this.storage.ref(path);

    this.task = this.storage.upload(path, this.file);

    // @ts-ignore
    this.percentage$ = this.task.percentageChanges();
    this.snapshot$ = this.task.snapshotChanges();
    this.snapshot$.pipe(
      takeUntil(this.destroy),
      finalize(async () => {
        this.downloadURL = await lastValueFrom(storageRef.getDownloadURL());
        console.log("43 upload last Value from ", this.downloadURL);
        this.complete.next(this.downloadURL);
      })
    ).subscribe();

  }

}
