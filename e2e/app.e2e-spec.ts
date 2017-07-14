import { JseedPage } from './app.po';

describe('jseed App', () => {
  let page: JseedPage;

  beforeEach(() => {
    page = new JseedPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
