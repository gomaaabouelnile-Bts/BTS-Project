import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {

  public progress: number;
  public message: string;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private http: HttpClient) {}
  ngOnInit() {
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    const filesToUpload: File[] = files;
    const formData = new FormData();
    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file' + index, file, file.name);
    });

    this.http.post('http://151.106.34.109:7005/api/Upload/Uploadfile', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        }
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }



  public uploadFile2 = (files) => {
    if (files.length === 0) {
      alert('Please Remove File First');
      return;
    }
    if (sessionStorage.getItem('file') === '1')
    {
      alert('Please Remove File First');
      return;
    }

    const fileToUpload =  files[0] as File;
    const formData = new FormData();
    const now = Date.now();
    formData.append('file', fileToUpload,
     fileToUpload.name);
    console.log(fileToUpload);

    this.http.post('http://151.106.34.109:7085/api/Company/Uploadfile', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
      this.progress = Math.round(100 * event.loaded / event.total);
      }
        else if (event.type === HttpEventType.Response) {
          this.message = 'success.';
          this.onUploadFinished.emit(event.body);
        }
      }); 
  }
}
