import { Injectable, inject } from "@angular/core";
import { ApiService } from 'api';
import { Observable } from "rxjs";
import { Profiles, SearchQueryParams } from "../models/profile-search.model";

@Injectable({ providedIn: 'root' })
export class ProfilesService {
  private readonly apiService = inject(ApiService);

  query(params: SearchQueryParams): Observable<Profiles> {
    const { name, page, per_page, languages } = params;
    let query = `${name}`;
    console.log('query1',query)

    if (languages !== undefined && languages.length > 0) {
      const languagesQuery = languages.map(language => `language:${language}`).join('+');
      query += `+${languagesQuery}`;
    }
    console.log('query2',query)

    let url = `/search/users?q=${query}`;

    if (page !== undefined) url += `&page=${page}`;
    if (per_page !== undefined) url += `&per_page=${per_page}`;

    return this.apiService.get<Profiles>(url);
  }


}
