import { Playlist } from './playlist';

export class PlaylistResult {
    constructor(
        public data: Playlist[],
        public next: string,
        public total: number
    ) { }
}
