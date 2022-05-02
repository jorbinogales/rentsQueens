import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateApartamentService } from './create-apartament.service';
import { ImageCroppedEvent, base64ToFile  } from 'ngx-image-cropper';

@Component({
  selector: 'app-create-apartament',
  templateUrl: './create-apartament.component.html',
  styleUrls: ['./create-apartament.component.scss']
})
export class CreateApartamentComponent implements OnInit {

  loading: boolean = false;
  form: any = FormGroup;
  error: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  /* MULTIPLE IMAGE */
  ulpoadedFiles: any = [];
  currentProcessingImg: any = 0;
  imgId: any=0;


  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _createApartamentService: CreateApartamentService,
    private readonly _router: Router,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onCloseHandled() {
    this.imageChangedEvent = null;
  }

  SaveCropedImage() {
    var imgObj = this.ulpoadedFiles.find(x => x.imgId === this.currentProcessingImg);
    imgObj.imgBase64 = this.croppedImage;
    this.onCloseHandled();
  }

  fileChangeEvent(event: any): void {
    //Processing selected Images 
    for (var i = 0; i < event.target.files.length; i++) {
      this.imageProcess(event, event.target.files[i]);
    }
  }

  imageProcess(event: any, file: any) {
    //Setting images in our required format
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.imgId = this.imgId + 1;
      this.ulpoadedFiles.push({ imgId: this.imgId, imgBase64: reader.result, imgFile: file });
    };
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  cropImage(imgId) {
    this.currentProcessingImg = imgId;
    var imgObj = this.ulpoadedFiles.find(x => x.imgId === imgId);
    //created dummy event Object and set as imageChangedEvent so it will set cropper on this image 
    var event = {
      target: {
        files: [imgObj.imgFile]
      }
    };
    this.imageChangedEvent = event;
    const modal = document.getElementById('btnFileModal');
    modal.click();
  }

  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }
  
  private buildForm(){
    this.form = this._formBuilder.group({
      title: ['', Validators.required],
      price: [, Validators.required],
      address: ['', Validators.required],
      floors: [],
      bedrooms: [],
      bathrooms: [],
      credit: [false],
      parking: [false],
      pets: [false],
      description: [''],
    })
  }

  createApartament(){

    this.error = null;
    this.loading = true;
    const form = this.form.getRawValue();
    this._createApartamentService.createApartament(form).subscribe((resp:any) =>{
      this.uploadImage(resp.id);
      this.error = null;
      this.loading = false;
    }, (err) => {
      this.error = err.error.message;
      this.loading = false;
    })
  }

  uploadImage(id_apartament: string){
    let files = [];
    this.ulpoadedFiles.forEach((uploadFile) =>{
      console.log(uploadFile.imgBase64);
      files.push(base64ToFile(uploadFile.imgBase64));
    })
    this._createApartamentService.uploadImageApartament(id_apartament, files).subscribe((resp:any) =>{
      this.error = null;
      this._router.navigate(['/', 'dashboard']);
      this.loading = false;
    }, (err) => {
      this.error = err.error.message;
      this.loading = false;
    })
  }


}
