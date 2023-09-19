import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';
import { Camera, CameraResultType } from '@capacitor/camera';

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

  async agregarFoto(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    this.firebaseService.guardarRegistro(this.currentUserMail,image.webPath)
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
      (await this.firebaseService.obtenerCosasLindas()).subscribe(cosasLindas => {
        this.cosasLindas = cosasLindas;
      });
    } catch (error) {
      console.error('Error al obtener las cosas lindas:', error);
    }
  }
}
