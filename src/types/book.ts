export interface BookRef {
    book: string;
    act: number;
    section?: number;
}

const TUTORIAL_BOOK: Book = {
    book: 'Tutorial',
    act: 0,
    section: undefined
};
