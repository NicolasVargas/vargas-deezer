export class ResultList<T> {
    constructor(
        public data: T[],
        public total: number,
        public next?: string,
        public prev?: string
    ) { }
}
