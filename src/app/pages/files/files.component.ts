import {
  Component, ViewChild
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { FileService } from '../../core/services/file.service';
import { File } from '../../core/interfaces/File.model';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent {
  loading = false;

  displayedColumns: string[] = ['name', 'createdAt', 'delete', 'share'];

  files: File[] = [];

  dataSource: MatTableDataSource<File>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private fileService: FileService,
    public dialog: MatDialog
  ) {
    this.files = [];
  }

  async ngOnInit() {
    const files$ = this.fileService.getAll(5, 0);
    const files = await lastValueFrom(files$);

    this.files = files[0];

    this.dataSource = new MatTableDataSource(this.files);
    this.dataSource.paginator = this.paginator;
  }

  async delete(id: number) {
    const deletedFile$ = this.fileService.delete(id);
    const deletedFile = await lastValueFrom(deletedFile$);
    if (deletedFile.affected) {
      const itemIndex = this.files.findIndex((obj: any) => obj.id === id);

      this.dataSource.data.splice(itemIndex, 1);
      this.dataSource.paginator = this.paginator;
    }
  }

  async share(id: number) {
    const shareLink$ = this.fileService.share(id);
    const { link } = await lastValueFrom(shareLink$);

    this.dialog.open(Dialog, {
      data: {
        link
      }
    });
  }
}
