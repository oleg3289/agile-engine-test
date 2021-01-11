import { IImageDetails } from "../interfaces/iImageDetails";

export class ImageDetails implements IImageDetails {
    public author: string;
    public camera: string;
    public cropped_picture: string;
    public full_picture: string;
    public id: string;
    public tags: string;

    constructor(values: object = {}) {
        Object.assign(this, values)
    }
}