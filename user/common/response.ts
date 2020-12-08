import { Response } from 'express';

interface Error {
    msg: string
    param?: string;
    location?: string;
    value?: any;
}

const response = (res: Response, status: number, data: Array<Error>) => {
    res.status(status).json({ data })
}   

const createResponse = (data: any) => {
    return [{ msg: data }]
}

export { response, createResponse }