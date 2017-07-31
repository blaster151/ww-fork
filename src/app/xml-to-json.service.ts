import { Injectable } from '@angular/core';

@Injectable()
export class XmlToJsonService {

  constructor() { }

  xmlStringToJson(xml: string) {
    return this.xmlToJson(
      this.stringToXML(xml)
    );
  }

  stringToXML(oString: string): Document {
    return (new DOMParser()).parseFromString(oString, "text/xml");
  }

  xmlToJson(xml: Node): any {
      // Thanks to https://davidwalsh.name/convert-xml-json

      // Create the return object
      var obj = {};

      if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
        obj['@attributes'] = {};
          for (var j = 0; j < xml.attributes.length; j++) {
            let attribute = xml.attributes.item(j);
            obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
          }
        }
      } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
      }

      // do children
      if (xml.hasChildNodes()) {
        for(let i = 0; i < xml.childNodes.length; i++) {
          let item = xml.childNodes.item(i);
          let nodeName = item.nodeName;
          if (typeof(obj[nodeName]) == "undefined") {
            obj[nodeName] = this.xmlToJson(item);
          } else {
            if (typeof(obj[nodeName].push) == "undefined") {
              let old = obj[nodeName];
              obj[nodeName] = [];
              obj[nodeName].push(old);
            }
            obj[nodeName].push(this.xmlToJson(item));
          }
        }
      }
      return obj;
  }
}
