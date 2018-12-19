import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should go directly to login page', () => {
    page.navigateTo();
    expect(browser.driver.getCurrentUrl()).toContain('/login');
  });

  it('should refirect wrong paths to login page', () => {
    page.navigateToWrongPage();
    expect(browser.driver.getCurrentUrl()).toContain('/login');
  });
});
