export class ContentPathService {
  private contentPath: string;

  constructor() { 
    if (window && window.frameElement)
    {
      let path = window.frameElement.getAttribute('data-content-path');
      this.contentPath = path;
    }
  }

  getContentPath() {
    return this.contentPath;
  }
}
