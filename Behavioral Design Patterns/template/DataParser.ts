/*eslint-disable @typescript-eslint/no-explicit-any*/
abstract class DataParse {
  public parseData() {
    this.loadData();
    const data = "simple data";
    const parsedData = this.parse(data);
    this.validate(parsedData);
    this.useData(parsedData);
    console.log("parsing data...");
  }

  private loadData() {
    console.log("loading data...");
  }

  private validate(data: any) {
    console.log("validating data...");
  }

  private useData(data: any) {
    console.log(`using data..`);
  }

  protected abstract parse(data: any): void;
}

class jsonParser extends DataParse {
  protected parse(data: any): void {
    console.log(`parse json data...${data}`);
  }
}
class XMLParser extends DataParse {
  protected parse(data: string): void {
    console.log(`parse XML data...${data}`);
  }
}

function parseData(parser: DataParse) {
  parser.parseData();
}

parseData(new XMLParser());
