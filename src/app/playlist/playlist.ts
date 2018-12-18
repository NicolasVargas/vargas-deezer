import { Track } from './track';

export class Playlist {
    constructor(
        public id: number,
        public title: string,
        public picture?: string,
        public picture_small?: string,
        public picture_medium?: string,
        public tracklist?: string,
        public nb_tracks?: number,
        public fans?: number,
        public tracks?: Track[],
        public creator?: any,
        public description?: string,
        public duration?: number
    ) { }
}
