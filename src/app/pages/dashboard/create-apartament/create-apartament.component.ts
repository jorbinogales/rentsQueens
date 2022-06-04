import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateApartamentService } from './create-apartament.service';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-create-apartament',
  templateUrl: './create-apartament.component.html',
  styleUrls: ['./create-apartament.component.scss'],
})
export class CreateApartamentComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  loading: boolean = false;
  form: any = FormGroup;
  error: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  /* MULTIPLE IMAGE */
  ulpoadedFiles: any = [];
  currentProcessingImg: any = 0;
  imgId: any = 0;
  trains: any;
  cities: any;
  apartament: any;
  subcities: any;
  subcity: any;
  apartament_id: any = null;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _createApartamentService: CreateApartamentService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let departamentId = this._activatedRoute.snapshot.paramMap.get('id');
    this._createApartamentService.getTrains().then((resp) => {
      this.trains = resp;
    });
    this._createApartamentService.getCity().then((resp) => {
      this.cities = resp;
    });

    if (departamentId) {
      this._createApartamentService.apartament$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((apartament: any) => {
          console.log(apartament);
          this.apartament = apartament;
          this.buildForm(this.apartament);
          this.getImageUrl(this.apartament);
          this.apartament_id = this.apartament.id;
          this.loading = false;
        });
    } else {
      this.buildForm();
    }
  }

  onCloseHandled() {
    this.imageChangedEvent = null;
  }

  SaveCropedImage() {
    var imgObj = this.ulpoadedFiles.find(
      (x) => x.imgId === this.currentProcessingImg
    );
    imgObj.imgBase64 = this.croppedImage;
    this.onCloseHandled();
  }

  fileChangeEvent(event: any): void {
    //Processing selected Images
    console.log('file', event);
    console.log('event target', event.target);
    if (event.target == null) {
      this.imageProcess(event, event);
    } else {
      for (var i = 0; i < event.target.files.length; i++) {
        this.imageProcess(event, event.target.files[i]);
      }
    }
  }

  imageProcess(event: any, file: any) {
    //Setting images in our required format
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.imgId = this.imgId + 1;
      this.ulpoadedFiles.push({
        imgId: this.imgId,
        imgBase64: reader.result,
        imgFile: file,
      });
    };
  }

  getImageUrl(departament: any) {
    //Setting images in our required format
    departament.image_values.forEach((image_value) => {
      var request = new XMLHttpRequest();
      console.log(image_value);
      request.open(
        'GET',
        environment.MS_USER_API + '/' + image_value.image,
        true
      );
      request.responseType = 'blob';
      request.onload = () => {
        var reader = new FileReader();
        reader.readAsDataURL(request.response);
        reader.onloadend = (e) => {
          this.imgId = this.imgId + 1;
          this.ulpoadedFiles.push({
            imgId: this.imgId,
            imgBase64: reader.result,
          });
        };
      };
      request.send();
    });
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  cropImage(imgId) {
    this.currentProcessingImg = imgId;
    var imgObj = this.ulpoadedFiles.find((x) => x.imgId === imgId);
    //created dummy event Object and set as imageChangedEvent so it will set cropper on this image
    var event = {
      target: {
        files: [imgObj.imgFile],
      },
    };
    this.imageChangedEvent = event;
    const modal = document.getElementById('btnFileModal');
    modal.click();
  }

  deleteImage(imgId) {
    this.currentProcessingImg = imgId;
    const index = this.ulpoadedFiles.findIndex((x) => x.imgId === imgId);
    this.ulpoadedFiles.splice(index, 1);
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

  async buildForm(apartament?: any) {
    this.form = this._formBuilder.group({
      title: [],
      price: [],
      phone: [],
      address: [],
      floors: [],
      bedrooms: [],
      bathrooms: [],
      train: [],
      city: [],
      subcity: [],
      credit: [],
      parking: [],
      pets: [],
      description: [],
      internal_description: [],
    });

    if (apartament) {
      this.form.controls['title'].setValue(
        apartament.title ? apartament.title : ''
      );
      this.form.controls['price'].setValue(
        apartament.price ? apartament.price : 0
      );
      this.form.controls['address'].setValue(
        apartament.address ? apartament.address : ''
      );
      this.form.controls['phone'].setValue(
        apartament.phone ? apartament.phone : ''
      );
      this.form.controls['floors'].setValue(
        apartament.floors ? apartament.floors : ''
      );
      this.form.controls['bedrooms'].setValue(
        apartament.bedrooms ? apartament.bedrooms : ''
      );
      this.form.controls['bathrooms'].setValue(
        apartament.bathrooms ? apartament.bathrooms : ''
      );
      this.form.controls['train'].setValue(
        apartament.train_value ? apartament.train_value.id : ''
      );
      if (apartament.subcity_value.id) {
        await this.getSubCity(apartament.subcity_value.id);
        this.form.controls['city'].setValue(
          this.subcity.city_value ? this.subcity.city_value.id : ''
        );
        this.form.controls['subcity'].setValue(
          apartament.subcity_value ? apartament.subcity_value.id : ''
        );
      }
      this.form.controls['credit'].setValue(
        apartament.credit ? apartament.credit : false
      );
      this.form.controls['parking'].setValue(
        apartament.parking ? apartament.parking : false
      );
      this.form.controls['pets'].setValue(
        apartament.pets ? apartament.pets : false
      );
      this.form.controls['description'].setValue(
        apartament.description ? apartament.description : ''
      );
      this.form.controls['internal_description'].setValue(
        apartament.internal_description ? apartament.internal_description : ''
      );
    } else {
      this.form.controls['title'].setValue('');
      this.form.controls['price'].setValue(0);
      this.form.controls['address'].setValue('');
      this.form.controls['phone'].setValue('');
      this.form.controls['floors'].setValue();
      this.form.controls['bedrooms'].setValue();
      this.form.controls['bathrooms'].setValue();
      this.form.controls['train'].setValue();
      this.form.controls['city'].setValue();
      this.form.controls['credit'].setValue(false);
      this.form.controls['parking'].setValue(false);
      this.form.controls['pets'].setValue(false);
      this.form.controls['description'].setValue('');
      this.form.controls['internal_description'].setValue('');
    }
  }

  createApartament(id?: string) {
    this.error = null;
    this.loading = true;
    const form = this.form.getRawValue();
    this._createApartamentService.createApartament(form, id).subscribe(
      (resp: any) => {
        this.uploadImage(resp.id);
        this.error = null;
        this.loading = false;
      },
      (err) => {
        this.error = err.error.message;
        this.loading = false;
      }
    );
  }

  uploadImage(id_apartament: string) {
    let files = [];
    this.ulpoadedFiles.forEach((uploadFile) => {
      files.push(base64ToFile(uploadFile.imgBase64));
    });
    this._createApartamentService
      .uploadImageApartament(id_apartament, files)
      .subscribe(
        (resp: any) => {
          this.error = null;
          this._router.navigate(['/', 'dashboard']);
          this.loading = false;
        },
        (err) => {
          this.error = err.error.message;
          this.loading = false;
        }
      );
  }

  // PASTE IMAGE FROM CLIPBOARD
  onPaste(e: any) {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    let blob = null;
    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
        this.fileChangeEvent(item.getAsFile());
      }
    }
  }

  getSubCities(e) {
    const city_id = e.target.value;
    this._createApartamentService.getSubCities(city_id).then((resp) => {
      this.subcities = resp;
    });
  }

  async getSubCity(subcity_id) {
    await this._createApartamentService.getSubCity(subcity_id).then((resp) => {
      this.subcity = resp;
      this._createApartamentService.getSubCities(resp.id).then((resp) => {
        this.subcities = resp;
      });
    });
  }
}
