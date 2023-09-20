import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
})
export class CosasFeasPage implements OnInit {


  currentUserMail: string | null= ""; 
  cosasFeas: any[] = [];
  constructor(public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.obtenerUsuarioLoggeado();
    this.obtenerCosasFeas();
  }

  async agregarFoto(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    this.firebaseService.guardarRegistro(this.currentUserMail,image.webPath,"cosas_feas")
  }

  obtenerUsuarioLoggeado(){
    this.firebaseService.getUserLogged().subscribe(user => {
      console.log(user?.email);
      if (user?.email != null) {
        this.currentUserMail = user.email 
      }
    })
  }

  async obtenerCosasFeas() {
    try {
      (await this.firebaseService.obtenerCosas("cosas_feas")).subscribe(cosasFeas => {
        this.cosasFeas = cosasFeas;
      });
    } catch (error) {
      console.error('Error al obtener las cosas lindas:', error);
    }
  }

  async mostrarMisFotos(){
    try {
      (await this.firebaseService.buscarFotosPorEmail(this.currentUserMail,"cosas_feas")).subscribe(cosasFeas => {
        this.cosasFeas = cosasFeas;
      });
    } catch (error) {
      console.error('Error al obtener las cosas lindas:', error);
    }
  }

  darMeGusta(event: Event,cosa: any) {
    event.preventDefault(); // Evitar acción predeterminada del botón
    event.stopPropagation(); // Detener propagación del evento
    // Verificar si el usuario actual ya ha dado "Me gusta" a esta foto
    const usuarioYaDioLike = cosa.likesUsuarios && cosa.likesUsuarios.includes(this.currentUserMail);
  
    if (!usuarioYaDioLike) {
      cosa.likes++; // Incrementar el contador de "Me gusta"
      // Agregar el correo del usuario actual a la lista de usuarios que dieron "Me gusta"
      if (!cosa.likesUsuarios) {
        cosa.likesUsuarios = [];
      }
      cosa.likesUsuarios.push(this.currentUserMail);
  
      // Actualizar el registro en Firestore
      this.firebaseService.actualizarRegistro(cosa);
    } else {
      // El usuario ya dio "Me gusta", puedes mostrar un mensaje de error o deshabilitar el botón
    }
  }
}
