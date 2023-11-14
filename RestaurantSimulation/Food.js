import { soondae } from "./main.js";

let orderNo = 1;

export class Food {
  constructor(name){
    this.name = name;
    if (name === soondae)
      this.time = 1000;
    else 
      this.time = 2000;
    this.no = orderNo++;
  }
}