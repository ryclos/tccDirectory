import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { TccDirectoryApiGlobal } from '../models/tccdirectoryapi-global.model';

@Injectable()
export class TccDirectoryApiService {

    private baseUrl: string = 'http://tccdirectory.1click.pf/api/';
    private skill: string = 'skills';

    constructor(private http: Http) {

    }

    public getSkills(): any {
        const url = `${this.baseUrl}${this.skill}`;
        console.log('getSkills url',url)
        return this.http.get(url)
        .toPromise()
        .then(Response => Response.json() as TccDirectoryApiGlobal)
        .catch(error => console.log('une erreur est survenu ' + error))
    }
}