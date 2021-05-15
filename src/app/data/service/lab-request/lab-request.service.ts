import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ICreateLabRequestDto } from '@data/schema/dto/create-lab-request.dto';

@Injectable({
    providedIn: 'root',
})
export class LabRequestService {
    baseUrl: string;
    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    createLabRequest(labRequest: ICreateLabRequestDto) {
        return this.http.post(this.baseUrl + '/labs', labRequest);
    }
}
