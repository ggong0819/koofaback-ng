import { LgLcmsPage } from './app.po';

describe('ng-lcms App', () => {
  let page: LgLcmsPage;

  beforeEach(() => {
    page = new LgLcmsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
