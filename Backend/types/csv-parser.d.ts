declare module 'csv-parser' {
    import { Transform } from 'stream';
  
    interface CsvParserOptions {
      separator?: string;
      headers?: string[];
      strict?: boolean;
      mapHeaders?: (header: { header: string }) => string;
      mapValues?: (value: string, header: string) => any;
    }
  
    function csv(options?: CsvParserOptions): Transform;
  
    export = csv;
  }
  