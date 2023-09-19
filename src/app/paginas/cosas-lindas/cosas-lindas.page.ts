import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';


@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage implements OnInit {

  currentUserMail: string | null= ""; 
  cosasLindas: any[] = [];
  constructor(public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.obtenerUsuarioLoggeado();
    this.obtenerCosasLindas();
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

  async obtenerCosasLindas() {
    try {
      const data = await this.firebaseService.obtenerCosasLindas();
      if (data) {
        this.cosasLindas = data;
        console.log(this.cosasLindas);
      }
    } catch (error) {
      console.error('Error al obtener las cosas lindas:', error);
    }
  }
}
