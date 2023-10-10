import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
})
export class CosasFeasPage implements OnInit {


  showSpinner= false;
  mostrarGrafico = false;
  @ViewChild('pieChart') pieChart: ElementRef;
  @ViewChild('barChart') barChart: ElementRef;
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

  usuarioYaDioLike(cosa: any): boolean {
    console.log( "Contiene: ",cosa.likesUsuarios && cosa.likesUsuarios.includes(this.currentUserMail));
    return cosa.likesUsuarios && cosa.likesUsuarios.includes(this.currentUserMail);
  }

  async obtenerCosasFeas() {
    try {
      (await this.firebaseService.obtenerCosas("cosas_feas")).subscribe(cosasLindas => {
        this.cosasFeas = cosasLindas;
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
      this.firebaseService.actualizarRegistro(cosa,"cosas_feas");
    } else {
      // El usuario ya dio "Me gusta", puedes mostrar un mensaje de error o deshabilitar el botón
    }
  }


  crearGraficoBarra() {
    if (this.cosasFeas.length > 0) {
      const data = this.cosasFeas.map(cosa => cosa.likes);
      const labels = this.cosasFeas.map(cosa => cosa.email);
  
      // Declarar el tipo de coloresUnicos
      const coloresUnicos: Record<string, string> = {};
      const colores = labels.map(email => {
        if (!coloresUnicos[email]) {
          coloresUnicos[email] = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`;
        }
        return coloresUnicos[email];
      });
  
      const barChart = new Chart(this.barChart.nativeElement, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Me Desagradas',
            data: data,
            backgroundColor: colores, // Usar los colores generados
            borderColor: colores, // Usar los colores generados
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  mostrarGraficos(){
    this.showSpinner=true;
    setTimeout(() => {
      this.showSpinner=false;
      this.crearGraficoBarra(); 
    }, 1500);
  }

  logout() {
    this.firebaseService.logout();
  }
}

