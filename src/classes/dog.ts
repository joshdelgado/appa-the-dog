import { Photo } from "./photo";

export class Dog {
    name: string;

    birthday: Date;

    gotchaDay: Date;

    photos: Photo[];

    constructor(name: string, birthday: string, gotchaDay: string, photos: Photo[]){
        this.name = name;
        this.birthday = new Date(birthday);
        this.gotchaDay = new Date(gotchaDay);
        this.photos = photos;
    }
}