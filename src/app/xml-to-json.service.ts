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

  xmlToJson(xml: Node) {
      // Thanks to https://davidwalsh.name/convert-xml-json

      // Create the return object
      let obj = {};

      // text node
      if (4 === xml.nodeType) {
          obj = xml.nodeValue;
      }

      if (xml.hasChildNodes()) {
          for (let i = 0; i < xml.childNodes.length; i++) {
              let TEXT_NODE_TYPE_NAME = '#text',
                  item = xml.childNodes.item(i),
                  nodeName = item.nodeName,
                  content;

              if (TEXT_NODE_TYPE_NAME === nodeName) {
                  //single textNode or next sibling has a different name
                  if ((null === xml.nextSibling) || (xml.localName !== xml.nextSibling.localName)) {
                      content = xml.textContent;

                  //we have a sibling with the same name
                  } else if (xml.localName === xml.nextSibling.localName) {
                      //if it is the first node of its parents childNodes, send it back as an array
                      content = (xml.parentElement.childNodes[0] === xml) ? [xml.textContent] : xml.textContent;
                  }
                  return content;
              } else {
                  if ('undefined' === typeof(obj[nodeName])) {
                      obj[nodeName] = this.xmlToJson(item);
                  } else {
                      if ('undefined' === typeof(obj[nodeName].length)) {
                          var old = obj[nodeName];
                          obj[nodeName] = [];
                          obj[nodeName].push(old);
                      }

                      obj[nodeName].push(this.xmlToJson(item));
                  }
              }
          }
      }
      return obj;
  }
}
