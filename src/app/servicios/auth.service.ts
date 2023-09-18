import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(public auth: AngularFireAuth,private navCtrl: NavController, public alertController: AlertController) { }


  login(correo:any, password:any){
        this.auth.signInWithEmailAndPassword(correo,password).then((res) => {
          let userCorreo = res.user?.email ? res.user?.email : '';
          localStorage.setItem("correo", userCorreo);
          this.navCtrl.navigateRoot('');
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
}

  /*async logout() {
    const loading = await this.LoadingController.create({
      message: 'Cerrando...',
      showBackdrop: true,
      spinner: "dots"
    });
    loading.present();
    firebase.auth().signOut().then(() => {
      setTimeout(() => {
        this.navCtrl.navigateRoot('/login');
        loading.dismiss();
      }, 1500);

    });
  }

  getEmailUser() {
    return firebase.auth().currentUser?.email || null;
  }*/
