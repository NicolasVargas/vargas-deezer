import { browser } from 'protractor';

export default {
    clearStorage() {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    }
};
