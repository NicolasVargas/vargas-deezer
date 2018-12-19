import { browser, by, element } from 'protractor';

export class LoginPage {
  gilUser = {
    id: 335481371,
    name: 'Gil - Programmateur France'
  };

  navigateTo() {
    return browser.get('/login');
  }

  getUserNameInput() {
    return element(by.css('input[name="userName"]'));
  }

  getUserCard(userId: number) {
    return element(by.css(`mat-card[id="user-${userId}"]`));
  }

  getUserCards() {
    return element.all(by.css('mat-card'));
  }

  loginWithMockedUser() {
    this.navigateTo();
    browser.waitForAngular();
    this.getUserNameInput().sendKeys(this.gilUser.name);
    this.getUserCard(this.gilUser.id).click();
  }
}
