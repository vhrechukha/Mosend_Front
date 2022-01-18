import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { FileService } from '../../core/services/file.service';
import { File } from '../../core/interfaces/File.model';
import { LocationStrategy } from '@angular/common';
import { FileResponse } from '../../core/responses';

@Component({
  selector: 'app-shared-file',
  templateUrl: './sharedFile.component.html',
  styleUrls: ['./sharedFile.component.css']
})
export class SharedFileComponent implements OnInit {
  loading = false;
  verifySharedFile: {
    mCode: FileResponse
  } | null = null;

  dataSource: MatTableDataSource<File>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private fileService: FileService,
    private locationStrategy: LocationStrategy
  ) {}

  async ngOnInit() {
    const verifySharedFile$ = this.fileService.verifyShare(this.locationStrategy.path());
    this.verifySharedFile = await lastValueFrom(verifySharedFile$);

    console.log(this.verifySharedFile);
  }

  delete(id: number) {
    // FEAT: add delete functional
  }

  share(id: number) {
    // FEAT: add share functional
  }
}
