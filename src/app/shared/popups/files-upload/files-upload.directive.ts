import {Directive, EventEmitter, HostListener, Input, Output} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {FilesUploadComponent} from "@app/shared/popups/files-upload/files-upload.component";


@Directive({
  selector: '[appFileUpload]'
})
export class FilesUploadDirective {
  @Input() multiple: boolean;
  @Input() crop: boolean;

  @Output() changed = new EventEmitter<string | string[]>();

  constructor(private dialog: MatDialog) {
  }
  @HostListener('click', ['$event']) onClick() {
    this.openDialog();
  }
  private openDialog(): void {
    const dialogRef = this.dialog.open(FilesUploadComponent, {
      width: '550px',
      height: '500px',
      data: {
        multiple: this.multiple,
        crop: this.crop,
      }
    })

    dialogRef.afterOpened().subscribe(result => {
      console.log("Value when close dialog ", result);
      // @ts-ignore
      this.changed.emit(result || null);
    })
  }
}
