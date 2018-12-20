import { by, element } from 'protractor';

export class PlaylistsPage {

  getPlaylistCards() {
    return element.all(by.css('mat-card'));
  }

  getPlaylistCard(playlistId: number) {
    return element(by.css(`mat-card[id="playlist-${playlistId}"]`));
  }
}
