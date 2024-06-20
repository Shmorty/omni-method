import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {FirebaseApp} from '@angular/fire/app';
import {FirebaseStorage, getBytes, getDownloadURL, getStorage, ref} from '@angular/fire/storage';
import {CapacitorHttp, HttpHeaders, HttpOptions} from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: FirebaseStorage;

  constructor(
    private http: HttpClient
  ) {
    this.storage = getStorage();
  }

  public getAnnouncements() {
    console.log("getAnnouncements");

    const filePath = "/content/videos/announcements/announcements.json";

    const fileRef = ref(this.storage, filePath);
    console.log("fileRef fullPath", fileRef.fullPath);
    console.log("fileRef name", fileRef.name);

    getDownloadURL(fileRef).then((url) => {
      console.log("got url", url);

      // retrieve with Angular HttpClient (CORS error)
      // this.http.get(url).subscribe((resp) => {
      //   console.log("get url response", resp);
      // });

      // read directly (CORS error)
      // const xhr = new XMLHttpRequest();
      // xhr.responseType = 'blob';
      // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      // xhr.onload = (event) => {
      //   console.log("onload event", event);
      //   const blob = xhr.response;
      //   console.log("blob", blob);
      // };
      // xhr.open('GET', url);
      // xhr.send();

      // firebase api (CORS error)
      // getBytes(fileRef).then((resp) => {
      //   console.log("getBytes", resp);
      // });

      // capacitor http client (empy response)
      const headers: HttpHeaders = {
        'Access-Control-Allow-Origin': '*'
      };
      const options: HttpOptions = {
        url: url,
        method: "GET",
        headers: headers,
        responseType: "json",
        readTimeout: 2000,
        connectTimeout: 2000,
        webFetchExtra: {
          mode: "no-cors"
        }
      };
      console.log("CapacitorHttp get...");
      CapacitorHttp.get(options).then((resp) => {
        console.log("response.status", resp.status);
        console.log("response.data", resp.data);
        console.log("response.url", resp.url);
        console.log("response.headers", resp.headers);
      }).catch((err) => {
        console.log("CapacitorHttp get error", err);
      });

    }).catch((err) => {
      console.log("getAnnouncements error", err);
    });

  }
}
