import { IToken } from "../interfaces/iToken";

export class Token implements IToken {
    public auth: boolean;
    public token: string;

    constructor(values: object = {}) {
        Object.assign(this, values)
    }
}