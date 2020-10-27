import { Component } from '@angular/core';
import * as SwaggerParser from '@apidevtools/swagger-parser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sandbox-manager';
  fileToUpload: File = null;

  handleFileInput(files: FileList): void {
    this.fileToUpload = files.item(0);

    const fileReader = new FileReader();
    const file = fileReader.readAsDataURL(this.fileToUpload);
    console.log(file);

    fileReader.onload = () => {
      console.log(fileReader.result);
      this.parseFile(fileReader.result.toString());
    };

  }

  parseFile(fileUrl: string): void {
    SwaggerParser.validate(fileUrl, (err, api) => {
        if (err) {
          console.error(err);
        }
        else {
          console.log('API name: %s, Version: %s', api.info.title, api.info.version);
        }
      });
  }

}
