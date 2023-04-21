import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropperComponent } from './components/cropper/cropper.component';
import { UploadComponent } from './components/upload/upload.component';
import { DropZoneDirective } from './directives/drop-zone.directive';
import {ImageCropperModule} from "ngx-image-cropper";
import {FileSizePipe} from "@app/shared/popups/files-upload/pipes/file-size/file-size-pipe";
import {FilesUploadComponent} from "@app/shared/popups/files-upload/files-upload.component";
import {FilesUploadDirective} from "@app/shared/popups/files-upload/files-upload.directive";
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
    declarations: [
        CropperComponent,
        UploadComponent,
        DropZoneDirective,
        FileSizePipe,
        FilesUploadComponent,
        FilesUploadDirective
    ],
  exports: [
    // DropZoneDirective,
    // CropperComponent,
    // UploadComponent
    FilesUploadDirective
  ],
    imports: [
        CommonModule,
        ImageCropperModule,
        MatDialogModule
    ]
})
export class FilesUploadModule { }
