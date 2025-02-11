type format = 'pdf' | 'xlsx' | 'xls'


export class FileExplorer {
  protected static openFileExplorer(format: format | format[]): Promise<File | null> {
    return new Promise((resolve, reject) => {
      const inputFile: HTMLInputElement = document.createElement('input');
      const isArray = Array.isArray(format);
      inputFile.type = 'file';

      inputFile.accept = isArray ? format.map(f => `.${f}`).join(',') : `.${format}`;

      inputFile.addEventListener('change', (event: Event) => {
        const target = event.target as HTMLInputElement;

        if (!target.files || target.files.length < 0)
          return resolve(null)
        const file = target.files[0];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (!isArray && fileExtension && fileExtension == format) {
          return resolve(file);
        }

        if (isArray && fileExtension && format.map(f => f.toLowerCase()).includes(fileExtension)){
          return resolve(file);
        }
        return resolve(null);
      });

      inputFile.click();
    });
  }

}



