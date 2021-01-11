import { Image } from '../models/image';

export interface IImagesData {
    hasMore: boolean;
    page: number;
    pageCount: number;
    pictures: Image[];
}