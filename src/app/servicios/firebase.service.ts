import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(public auth: AngularFireAuth,
              public navCtrl: NavController, 
              public alertController: AlertController,
              private firestore: AngularFirestore
              ) { }

   myDate = new Date();
   cosasLindas: any[] = [];

  login(correo:any, password:any){
        this.auth.signInWithEmailAndPassword(correo,password).then((res) => {
          let userCorreo = res.user?.email ? res.user?.email : '';
          localStorage.setItem("correo", userCorreo);
          this.navCtrl.navigateRoot('/home');
          console.log(userCorreo);
        }).catch(async (error) => {
          let errorMessage = error.message;
          if (errorMessage.includes('correo', 'password') || !correo.valid && !password.valid) {
            errorMessage = 'Debe ingresar un correo y contraseña correcta';
          } else if (errorMessage.includes('password') || !password.valid) {
            errorMessage = 'Por favor, ingrese una contraseña válida.';
          } else {
            errorMessage = "Usuario inexistente";
          }
          console.log(errorMessage);

         this.presentAlert("Error",errorMessage)
        });
    }

    async presentAlert(header: string, subHeader: string, message?: string) {
      const alert = await this.alertController.create({
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: ['OK'],
      });
      await alert.present();
    }

    async guardarRegistro(email?: any,foto?: any) {
      this.myDate = new Date();

      let fotoData = {
        email: email,
        foto: foto,
        fecha: this.myDate.toLocaleDateString() + " " + this.myDate.toLocaleTimeString(),
        likes: 0 
      }
      
      try {
        const result = await this.firestore.collection('cosas_lindas').add(fotoData);
        console.log('Registro guardado con ID: ', result.id);
        this.presentAlert("Exito","'Registro guardado");
        return result.id;
      } catch (error) {
        this.presentAlert("Error","Error al guardar foto");
        throw error;
      }
    }

    getUserLogged(){
      return this.auth.authState;
    }

    async obtenerCosasLindas() {
      try {
        return this.firestore.collection('cosas_lindas', ref => ref.orderBy('fecha', 'desc')).snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return Object.assign({}, data, { id });
            });
          })
        );
      } catch (error) {
        console.error('Error al obtener las cosas lindas:', error);
        throw error;
      }
    }

    async buscarFotosPorEmail(email: any,coleccion: string) {
      try {
        return this.firestore.collection(coleccion, ref => ref.where('email', '==', email).orderBy("fecha","desc")).snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return Object.assign({}, data, { id });
            });
          })
        );
      } catch (error) {
        console.error('Error al buscar fotos por email:', error);
        throw error;
      }
    }

    async actualizarRegistro(cosa: any) {
      try {
        const docId = cosa.id; // Obtén el ID del documento
        delete cosa.id; // Elimina el campo 'id' para evitar problemas de actualización
    
        await this.firestore.collection('cosas_lindas').doc(docId).update(cosa);
        console.log('Registro actualizado con ID: ', docId);
      } catch (error) {
        this.presentAlert('Error', 'Error al actualizar el registro');
        throw error;
      }
    }
    
  }