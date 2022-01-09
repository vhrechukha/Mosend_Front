import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { MultipartUpload } from '../../core/interfaces';
import { FileService } from '../../core/services/file.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-file-form',
  templateUrl: './fileForm.component.html',
  styleUrls: ['./fileForm.component.css']
})
export class FileFormComponent {
  constructor(
    private authService: AuthService,
    private fileService: FileService,
  ) {}

  async chunk(event: Event) {
    const eventWithFiles = event as unknown as & {
      target: {
        files: File[]
      }
    };

    const partSize = 1024 * 1024 * 5;
    const file: File = eventWithFiles.target.files[0];
    const fileReader = new FileReader();
    const multipartUpload: MultipartUpload = { Parts: [] };
    let dataFile: Buffer;

    fileReader.onload = async () => {
      dataFile = global.Buffer.from(fileReader.result);

      if (dataFile) {
        const multipart$ = this.fileService.initialize({
          content_type: file.type,
          extension: file.type.split('/')[0],
          filename: file.name,
          chunk_count: Math.floor(file.size / partSize),
          chunk_size: partSize,
          max_download_count: 5,
          filesize: file.size
        });
        const multipart = await lastValueFrom(multipart$);

        let partNumber = 0;
        for (let rangeStart = 0; rangeStart < dataFile.length; rangeStart += partSize) {
          console.log(dataFile.slice(rangeStart, dataFile.length));
          partNumber += 1;

          const result$ = this.fileService.chunk(multipart.id, {
            partNumber,
            body: dataFile.slice(rangeStart, dataFile.length).buffer
          });
          // eslint-disable-next-line no-await-in-loop
          const { data } = await lastValueFrom(result$);

          multipartUpload.Parts[partNumber - 1] = {
            ETag: data.ETag,
            PartNumber: Number(partNumber)
          };
        }

        const result$ = this.fileService.finalize(multipart.id, {
          multipartUpload
        });

        await lastValueFrom(result$);
      }
    };

    fileReader.readAsArrayBuffer(file);
  }
}
