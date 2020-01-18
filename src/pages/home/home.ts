import { Component } from '@angular/core';
import { NavController, ActionSheetController, ModalController, Modal} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  photos : Array<string>;
  photosTemp : Array<string>;
  info:any={};
  permission : boolean;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public imagePicker: ImagePicker,
    public camera: Camera,
    public cropService: Crop,
    private androidPermissions:AndroidPermissions,
    private modal : ModalController
  ) {
    this.info.maxImage = 5;
    this.permission = false;
    this.checkPermission();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose or take a picture',
      buttons: [
        {
          text: 'Take a picture',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Choose pictures',
          handler: () => {
            this.openImagePicker();
          }
        }
      ]
    });
    actionSheet.present();
  }
  
  checkPermission(){
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
      result => this.permission = result.hasPermission,
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
    );
    if (!this.permission){
      console.log("masuk")
      this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE);
      return;
    }
  }

  openImagePicker(){
    let options = {
      maximumImagesCount: -1
    }
    this.photos = new Array<string>();
    this.photosTemp = new Array<string>();
    this.imagePicker.getPictures(options)
    .then((results) => {
      for (var i = 0;i<results.length;i++){
        var data:any = {};
        data.filename = results[i].substring(results[i]
          .lastIndexOf('/')+1);
        data.path = results[i];
        data.info = "Gambar "+(i+1)+" dari "+results.length
        this.photosTemp.push(data);
      }
      if(this.photosTemp.length>0){
        this.openPreview(this.photosTemp);
      }
      
    }, (err) => { console.log(err) });
  }

  openPreview(sendPhotosTemp){
    const preview:Modal = this.modal.create('PreviewImagePage',{data : sendPhotosTemp});
    
    preview.present();
    preview.onDidDismiss((data)=>{
      this.photos = data;
    })
  }

  takePicture(){
    let options = {
      quality: 100,
      correctOrientation: true
    };

    this.camera.getPicture(options)
    .then((data) => {
      this.photos = new Array<string>();
      this.cropService
      .crop(data, {quality: 75})
      .then((newImage) => {
        var data:any = {};
        data.filename = newImage.substring(newImage
          .lastIndexOf('/')+1);
        data.path = newImage;
        data.info = "Gambar dari kamera"
        this.photos.push(data);
      }, error => console.error("Error cropping image", error));
    }, function(error) {
      console.log(error);
    });
  }

}
