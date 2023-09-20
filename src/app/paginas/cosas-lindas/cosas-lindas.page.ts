import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage implements OnInit {

  showSpinner= false;
  mostrarGrafico = false;
  @ViewChild('pieChart') pieChart: ElementRef;
  @ViewChild('barChart') barChart: ElementRef;
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
    this.firebaseService.guardarRegistro(this.currentUserMail,image.webPath,"cosas_lindas")
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
      (await this.firebaseService.obtenerCosas("cosas_lindas")).subscribe(cosasLindas => {
        this.cosasLindas = cosasLindas;
      });
    } catch (error) {
      console.error('Error al obtener las cosas lindas:', error);
    }
  }

  async mostrarMisFotos(){
    try {
      (await this.firebaseService.buscarFotosPorEmail(this.currentUserMail,"cosas_lindas")).subscribe(cosasLindas => {
        this.cosasLindas = cosasLindas;
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
      this.firebaseService.actualizarRegistro(cosa,"cosas_lindas");
    } else {
      // El usuario ya dio "Me gusta", puedes mostrar un mensaje de error o deshabilitar el botón
    }
  }

  crearGraficoTorta() {

    this.mostrarMisFotos();
    if (this.cosasLindas.length > 0) {
      const data = this.cosasLindas.map(cosa => cosa.likes);
      const labels = this.cosasLindas.map(cosa => cosa.email);

      const pieChart = new Chart(this.pieChart.nativeElement, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              // ... Agregar más colores si es necesario
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              // ... Agregar más colores si es necesario
            ],
            borderWidth: 1,
          }],
        },
      });
    }
  }

  mostrarGraficos(){
    this.showSpinner=true;
    setTimeout(() => {
      this.showSpinner=false;
      this.crearGraficoTorta(); 
    }, 1500);
    this.mostrarGrafico= true;
  }

  logout() {
    this.firebaseService.logout();
  }

}
