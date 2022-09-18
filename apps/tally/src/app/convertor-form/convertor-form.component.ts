import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Message } from '@tally-utility/api-interfaces';

@Component({
  selector: 'tally-utility-convertor-form',
  templateUrl: './convertor-form.component.html',
  styleUrls: ['./convertor-form.component.css'],
})
export class ConvertorFormComponent {
  constructor(private http: HttpClient) {}
  file: File | null = null;
  download_file: Message = { message: '' };

  @Input()
  name!: string;

  changeHandler(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.file = target.files[0];
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sendData(e: Event) {
    if (this.file != null) {
      console.log('sending');
      console.log(this.file);
      // console.log(e);
      const formData = new FormData();

      formData.append('file', this.file, this.file.name);
      console.log(formData);

      this.http
        .post<Message>(`/api/create_${this.name}`, formData)
        .subscribe((l: Message) => {
          if (l?.message) this.download_file = l;
          console.log(l);
          const downloadLink = document.createElement('a');

          downloadLink.setAttribute('download', `${this.name} entry.xml`);
          downloadLink.href = 'api/tmp/' + this.download_file.message;
          downloadLink.click();
        });
    }
  }
}
