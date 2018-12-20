import { PlaylistsPage } from './playlists.po';
import { LoginPage } from './login.po';
import { browser } from 'protractor';
import browserUtils from './browser-utils';

describe('Playlists page', () => {
    let page: PlaylistsPage;
    let loginPage: LoginPage;

    beforeAll(() => {
        browserUtils.clearStorage();
        page = new PlaylistsPage();
        loginPage = new LoginPage();
        loginPage.loginWithMockedUser();
        browser.waitForAngular();
    });

    it('should see the 25 first user\'s playlist', () => {
        expect(page.getPlaylistCards().count()).toEqual(25);
    });

    it('should scroll and use lazy load to see the rest of user\'s playlist', () => {
        page.getPlaylistCards().then(cards => {
            browser.executeScript('window.scrollTo(0,document.body.offsetHeight);')
                .then(() => {
                    browser.waitForAngular();
                    expect(page.getPlaylistCards().count()).toBeGreaterThan(25);
                });
        });
    });

    it('should go to playlist details', () => {
        page.getPlaylistCard(700895155).click();
        browser.waitForAngular();
        expect(browser.driver.getCurrentUrl()).toContain(`/playlists/700895155`);
    });
});
