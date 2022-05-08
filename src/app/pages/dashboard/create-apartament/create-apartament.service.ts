import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { ApartamentInterface } from "src/app/interface/apartament.interface";
import { environment } from "src/environments/environment";
import { TrainInterface } from '../../../interface/train.interface';

@Injectable({
    providedIn: 'root'
})
export class CreateApartamentService {
    public _train: BehaviorSubject<TrainInterface | null> = new BehaviorSubject(null);
    public _apartament: BehaviorSubject<ApartamentInterface | null> = new BehaviorSubject(null);

    constructor(private _http : HttpClient){}

    get apartament$(): Observable<ApartamentInterface>
    {
        return this._apartament.asObservable();
    }

    get train$(): Observable<TrainInterface>
    {
        return this._train.asObservable();
    }

    getTrains(): Promise<any>
    {
        return this._http.get<any>(`${environment.MS_USER_API}/trains/index`).toPromise();
    }

    createApartament(form: any): Observable<ApartamentInterface>
    {
        let data = {
            title: form.title,
            description: form.description,
            price: form.price,
            address:form.address,
            floors: form.floors,
            bedrooms: form.bedrooms,
            bathrooms:form.bathrooms,
            credit: form.credit,
            pets: form.pets,
            train: parseInt(form.train),
            parking: form.parking,
            phone: form.phone
        }
        return this._http.post<ApartamentInterface>(`${environment.MS_USER_API}/departament`, data).pipe(
            tap((response) => {
                return response;
            })
        )
    }

    uploadImageApartament(apartament_id: string, files:any[]): Observable<any>
    {
        const formData: FormData = new FormData();
        formData.append('departament_id', apartament_id);
        files.forEach((file)=>{
            formData.append('image', file);
        })
        return this._http.post<any>(`${environment.MS_USER_API}/departament_image`, formData).pipe(
            tap((response) => {
                console.log(response);
                return response;
            })
        )
    }
}