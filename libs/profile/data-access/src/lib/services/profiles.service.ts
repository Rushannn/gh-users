import { Injectable, inject } from "@angular/core";
import { ApiService } from 'api';
import { Observable } from "rxjs";
import { Profiles, SearchQueryParams } from "../models/profile-search.model";

@Injectable({ providedIn: 'root' })
export class ProfilesService {
  private readonly apiService = inject(ApiService);

  query(params: SearchQueryParams): Observable<Profiles> {
    const { name, page, per_page, languages, order } = params;
    let url = `/search/users?q=${name}`;

    if (page !== undefined) url += `&page=${page}`;
    if (per_page !== undefined) url += `&per_page=${per_page}`;
    if (languages !== undefined && languages.length > 0) {
      languages.forEach((language) => {
        url += `+language:${language}`;
      });
    }
    if (order !== undefined) url += `&order=${order}`;

    return this.apiService.get<Profiles>(url);
  }

}
