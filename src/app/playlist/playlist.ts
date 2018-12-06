export class Playlist {
    constructor(
        public id: number,
        public picture: string,
        public picture_small: string,
        public picture_medium: string,
        public title: string,
        public tracklist: string,
        public nb_tracks: number
    ) { }
}
