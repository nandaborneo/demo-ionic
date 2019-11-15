import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ImagePicker } from '@ionic-native/image-picker';

/**
 * Generated class for the PreviewImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preview-image',
  templateUrl: 'preview-image.html',
})
export class PreviewImagePage {
  previewPhotos : Array<string>;

  constructor(
    public imagePicker: ImagePicker,
    public navCtrl: NavController,
     public navParams: NavParams,
     private view:ViewController,
     private actionSheetCtrl:ActionSheetController) {
  }

  ionViewWillLoad() {
    this.previewPhotos = this.navParams.get("data");
    console.log(this.previewPhotos);
  }

  closePreview(){
    this.view.dismiss();
  }

  removeImage(value){
    for( var i = 0; i < this.previewPhotos.length; i++){ 
      console.log(this.previewPhotos[i]['filename']+"|"+value)
      if ( this.previewPhotos[i]['filename'] === value) {
        this.previewPhotos.splice(i, 1);
        i--;
        for( var ii = 0; ii < this.previewPhotos.length; ii++){
          this.previewPhotos[ii]['info'] = "Gambar "+(ii+1)+" dari "+this.previewPhotos.length
        }
      }
   }
   console.log(this.previewPhotos);
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Add or Send picture',
      buttons: [
        {
          text: 'Add Picture',
          handler: () => {
            this.openImagePicker();
          }
        },
        {
          text: 'send pictures',
          handler: () => {
            this.view.dismiss(this.previewPhotos)
          }
        }
      ]
    });
    actionSheet.present();
  }

  openImagePicker(){
    let options = {
      maximumImagesCount: -1
    }
    this.imagePicker.getPictures(options)
    .then((results) => {
      for (var i = 0;i<results.length;i++){
        var data:any = {};
        data.filename = results[i].substring(results[i]
          .lastIndexOf('/')+1);
        data.path = results[i];
        this.previewPhotos.push(data);
        for( var ii = 0; ii < this.previewPhotos.length; ii++){
          this.previewPhotos[ii]['info'] = "Gambar "+(ii+1)+" dari "+this.previewPhotos.length
        }
      }
      console.log(this.previewPhotos)
      
    }, (err) => { console.log(err) });
  }
}
