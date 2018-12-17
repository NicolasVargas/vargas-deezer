import { Artist } from './artist';

export class Track {
    constructor(
        public id: number,
        public title: string,
        public duration: number,
        public artist: Artist
    ) { }
}
