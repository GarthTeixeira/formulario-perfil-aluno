import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeUTF8',
  standalone: true
})
export class DecodeUTF8Pipe implements PipeTransform {

  transform(value: string): string {
    console.log(value)
    if (this.isLikelyUtf8(value)) {
      try {
        const decoder = new TextDecoder('utf-8');
        const encodedValue = new Uint8Array(value.split('').map(char => char.charCodeAt(0)));
        let decoded = decoder.decode(encodedValue)
        decoded = this.fixInvalidChar(decoded)
        return decoded
      } catch {
        return value;
      }
    }
    return value;
  }

  private isLikelyUtf8(value: string): boolean {
    // Verifica caracteres comuns de codificação UTF-8 incorreta
    const utf8Pattern = /Ã|Ã§|Ã³|Ãª|Â|Â¡|Â¿/;
    return utf8Pattern.test(value);
  }
  private fixInvalidChar(value: string): string {
    return value.replace(/\uFFFD/g, '°'); // Substitui '�' por '°', encontrado nas séries das disciplinas
  }

}
