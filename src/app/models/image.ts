import { IImage } from "../interfaces/iImage";

export class Image implements IImage {
    public cropped_picture: string;
    public id: string;

    constructor(values: object = {}) {
        Object.assign(this, values)
    }
}