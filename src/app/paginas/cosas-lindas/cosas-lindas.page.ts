import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';


@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage implements OnInit {

  currentUserMail: string | null= ""; 
  constructor(public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.obtenerUsuarioLoggeado();
  }

  addFoto(){
    this.firebaseService.guardarRegistro(this.currentUserMail,"x")
  }

  obtenerUsuarioLoggeado(){
    this.firebaseService.getUserLogged().subscribe(user => {
      console.log(user?.email);
      if (user?.email != null) {
        this.currentUserMail = user.email 
      }
    })
  }

}
