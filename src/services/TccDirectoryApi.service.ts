import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { TccDirectoryApiGlobal } from '../models/tccdirectoryapi-global.model';
import { TccDiretoryApiSkill } from '../models/tccdirectoryapi-skill.model';
import { TccDirectoryApiBusiness } from '../models/tccdirectoryapi-business.model';
import { TccDirectoryApiGlobalList } from '../models/tccdirectoryapi-globallist.model';

@Injectable()
export class TccDirectoryApiService {

  private baseUrl = 'http://tccdirectory.1click.pf/api/';
  private business = 'business/';
  private businesses = 'businesses';
  private search = 'search';
  private skills = 'skills';

  constructor(private http: Http) {

  }

  public getSkills(id): Promise<any> {
    const url = `${this.baseUrl}${this.business}${id}`;
    console.log('getSkills url', url)

    return this.http.get(url)
      .toPromise()
      .then(Response => Response.json() as TccDirectoryApiBusiness)
      .catch(error => console.log('une erreur est survenue ', JSON.stringify(error)))
  }

  public getBusiness(): Promise<any> {
    const url = `${this.baseUrl}${this.businesses}`;
    console.log('getBusiness url', url)

    return this.http.get(url)
      .toPromise()
      .then(Response => Response.json() as TccDirectoryApiGlobal)
      .catch(error => console.log('une erreur est survenue ', JSON.stringify(error)))
  }

  public getBusinessById(id): Promise<any> {
    const url = `${this.baseUrl}${this.business}${id}`;
    console.log('getBusiness PD url', url)

    return this.http.get(url)
      .toPromise()
      .then(Response => Response.json() as TccDirectoryApiGlobal)
      .catch(error => console.log('une erreur est survenue ', JSON.stringify(error)))
  }

  // Fonction pour récupérer l'ensemble des compétences
  public getSkillsList(): Promise<any> {
    const url = `${this.baseUrl}${this.skills}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as TccDirectoryApiGlobalList)
      .catch(error => console.log('Erreur dans getSkillsList', JSON.stringify(error)))
  }



  public postSkillFilter(selected_skills): Observable<any> {

    const url = `${this.baseUrl}${this.search}`;
    let body = { 'skills': selected_skills.join(",") };

    return this.http.post(url, body)
      .map(response => response.json() as TccDiretoryApiSkill);
  }
}
