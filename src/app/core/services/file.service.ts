import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ChunkRequest, ChunkResponse, File, FileInit, FinalizeRequest, FinalizeResponse
} from '../interfaces';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { FileResponse } from '../responses';
import { FileInitResponse } from '../interfaces/FileInitResponse.model';

@Injectable({ providedIn: 'root' })
export class FileService {
  backendUrl = environment.backendUrl;

  private readonly httpOptions: { headers: HttpHeaders; };

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    console.log(this.authService.currentToken);
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.currentToken}`
      })
    };
  }

  getAll(take: number, skip: number): Observable<[File[], number]> {
    return this.http.get<[File[], number]>(`${this.backendUrl}/file?take=${take}&skip=${skip}`, this.httpOptions);
  }

  getOne(id: number): Observable<File> {
    return this.http.get<File>(`${this.backendUrl}/file/${id}`, this.httpOptions);
  }

  initialize(data: FileInit): Observable<FileInitResponse> {
    return this.http.post<FileInitResponse>(`${this.backendUrl}/file/`, data, this.httpOptions);
  }

  chunk(id: number, data: ChunkRequest): Observable<ChunkResponse> {
    const formData = new FormData();
    formData.append('partNumber', String(data.partNumber));
    formData.append('body', new Blob([data.body]));

    return this.http.post<ChunkResponse>(`${this.backendUrl}/file/${id}/chunk`, formData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.currentToken}`
      })
    });
  }

  finalize(id: number, data: FinalizeRequest): Observable<FinalizeResponse> {
    return this.http.post<FinalizeResponse>(`${this.backendUrl}/file/${id}/finalize`, data, this.httpOptions);
  }

  report(id: number): Observable<{
    mCode: FileResponse.SCHEDULED_FOR_CHECK,
  }> {
    return this.http.post<{
      mCode: FileResponse.SCHEDULED_FOR_CHECK,
    }>(`${this.backendUrl}/file/${id}/report`, {}, this.httpOptions);
  }

  share(id: number): Observable<{
    link: string
  }> {
    return this.http.post<{
      link: string
    }>(`${this.backendUrl}/file/share/${id}`, {}, this.httpOptions);
  }

  verifyShare(path: string): Observable<{
    mCode: FileResponse.SHARE_LINK_VERIFIED,
  }> {
    return this.http.get<{
      mCode: FileResponse.SHARE_LINK_VERIFIED,
    }>(`${this.backendUrl}${path}`, this.httpOptions);
  }

  delete(id: number): Observable<{
    row: [],
    affected: number
  }> {
    return this.http.delete<{
      row: [],
      affected: number
    }>(`${this.backendUrl}/file/${id}`, this.httpOptions);
  }
}
