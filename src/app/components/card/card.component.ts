import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() departament:any;
  @Output() status: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  url: string;
  session: boolean = false;

  constructor(
    private readonly _cookieService: CookieService,
  ) { }

  ngOnInit(): void {
    this.url = environment.MS_USER_API;
    this.onSession();
  }


  private onSession(){
    const token = this._cookieService.get('token');
    token ? this.session = true : this.session = false;
  }

  changeStatus(id){
    this.status.emit(id);
  }

  deleteDepartament(id){
    this.delete.emit(id);
  }

}
