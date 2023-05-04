import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {push} from "@angular/fire/database";
export interface DialogData {
  multiple: boolean,
  crop: boolean
}
@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss']
})
export class FilesUploadComponent implements OnInit{
  isHovering: boolean;

  files: File[] = [];  // List files
  imageFile: File;      // If single file, save here
  isError: boolean;

  filesURLs: string[] = [];   //List url
  constructor(private dialogRef: MatDialogRef<FilesUploadComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
  ngOnInit() {

  }

  toggleHover(event: boolean):void {
    this.isHovering = event;
  }
  onDropByFileList(files: FileList): void {
    this.onDrop(files);
  }
  onDropByEvent(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    this.onDrop(files);
  }
  onDrop(files: FileList): void {
    // const files = (event.target as HTMLInputElement).files;
    this.isError = false;

    if(this.data.crop && files.length > 1) {
      this.isError = true;
      return;
    }
    // Save for 1 file
    if(this.data.crop && files.length === 1 && files.item(0).type.split('/')[0] === 'image') {
      this.imageFile = files.item(0);
      return;
    }
    // Save for many file
    for(let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
    console.log("Check files ", files);
  }
  onCrop(file: File): void {
    this.imageFile = null;
    this.files.push(file);
  }
  onUploadComplete(url: string): void {
    console.log(62, " from file upload ", url)
    this.filesURLs.push(url);
  }
  onComplete(): void {
    console.log( 66, this.data.multiple , this.filesURLs)
    const res = this.data.multiple ? this.filesURLs : this.filesURLs[0];
    this.dialogRef.close(res);
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
