import { Image } from "./image";
import { IImagesData } from "../interfaces/iImagesData";

export class ImagesData implements IImagesData {
    public hasMore: boolean;
    public page: number;
    public pageCount: number;
    private _pictures: Image[];

    constructor(values: object = {}) {
        Object.assign(this, values)
    }

    set pictures(val) {
        this._pictures = val.map(i => new Image(i));
    }

    get pictures() {
        return this._pictures;
    }
}