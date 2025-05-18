import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { resolve } from 'path';

@Injectable({
  providedIn: 'root'
})
export class FakeLoadingService {

  constructor() { }

  //CRUD
  loadingWithPromise(): Promise<number>{
    return new Promise((resolve, reject)=>{
      let i = 0;
      const interval = setInterval(()=>{
        i++;
        if(i===3){
          clearInterval(interval);
          resolve(i);
        }
      },1000)
    })

  }

  loadingWithPromise2(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i === 3) {
          clearInterval(interval);
          if (email === 'test@gmail.com' && password === 'testpw') {
            resolve(true);
          } else {
            reject(false);
          }
        }
      }, 1000);
    });
  }
  loadingWithPromise3(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'test@gmail.com' && password === 'testpw') {
          resolve(true);

        } else {
          reject(false);
        }
      }, 3000);
    })
  }
}
