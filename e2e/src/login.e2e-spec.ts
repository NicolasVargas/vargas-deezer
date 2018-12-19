import { browser, by, element, ElementFinder } from 'protractor';
import { LoginPage } from './login.po';
import browserUtils from './browser-utils';

describe('Login page', () => {
  let page: LoginPage;
  beforeEach(() => {
    browser.waitForAngularEnabled(true);
  });

  beforeEach(() => {
    page = new LoginPage();
  });

  afterEach(function () {
    browserUtils.clearStorage();
  });

  it('should be on /login page', () => {
    page.navigateTo();
    expect(page.getUserNameInput().isPresent()).toBeTruthy();
    expect(browser.driver.getCurrentUrl()).toContain('/login');
  });

  it('should search for users and display users', () => {
    page.navigateTo();
    page.getUserNameInput().sendKeys('Eminem');
    page.getUserCards().then(cards => {
      expect(cards.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('should log with user : Gil - Programmateur France', () => {
    page.navigateTo();
    page.getUserNameInput().sendKeys(page.gilUser.name);
    const matcard = element(by.css('mat-card'));
    expect(matcard.isPresent()).toBeTruthy();
    page.getUserCard(page.gilUser.id).click();
    browser.waitForAngular();
    expect(browser.driver.getCurrentUrl()).toContain(`${page.gilUser.id}/playlist`);
  });
});
