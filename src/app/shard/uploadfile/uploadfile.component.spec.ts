<div class="form-row">
    <div class="col-md-3">
      <input type="file" #file placeholder="Choose file" (change)="uploadFile2(file.files)"
       style="display:none;" >
      <button type="button" class="btn btn-success" (click)="file.click()">Upload File</button>
    </div>
    <div class="col-md-5">
      <span class="upload" *ngIf="progress > 0">
        {{progress}}%
      </span>
      <span class="upload" *ngIf="message">
        {{message}}
      </span>
    </div>
  </div>