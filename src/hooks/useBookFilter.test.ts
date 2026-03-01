import { describe, it, expect } from 'vitest';
import { matchesFilter, BookFilter } from './useBookFilter';
import { BookRef } from '../types/bookRef';

describe('matchesFilter', () => {
    const act1Ref: BookRef = {
        book: 'The Legion of Shadow',
        act: 1,
        section: 42
    };
    const act2Ref: BookRef = {
        book: 'The Legion of Shadow',
        act: 2,
        section: 300
    };
    const act3Ref: BookRef = {
        book: 'The Legion of Shadow',
        act: 3,
        section: 800
    };
    const otherBookRef: BookRef = {
        book: 'Heart of Fire',
        act: 1,
        section: 10
    };

    it('all filter matches everything', () => {
        const filter: BookFilter = { type: 'all' };

        expect(matchesFilter(filter, act1Ref)).toBe(true);
        expect(matchesFilter(filter, act2Ref)).toBe(true);
        expect(matchesFilter(filter, act3Ref)).toBe(true);
        expect(matchesFilter(filter, otherBookRef))
            .toBe(true);
    });

    it('book filter matches all acts of the book',
        () => {
            const filter: BookFilter = {
                type: 'book',
                book: 'The Legion of Shadow'
            };

            expect(matchesFilter(filter, act1Ref))
                .toBe(true);
            expect(matchesFilter(filter, act2Ref))
                .toBe(true);
            expect(matchesFilter(filter, act3Ref))
                .toBe(true);
        }
    );

    it('book filter does not match other books',
        () => {
            const filter: BookFilter = {
                type: 'book',
                book: 'The Legion of Shadow'
            };

            expect(matchesFilter(filter, otherBookRef))
                .toBe(false);
        }
    );

    it('act filter matches only the specific act',
        () => {
            const filter: BookFilter = {
                type: 'act',
                book: 'The Legion of Shadow',
                act: 2
            };

            expect(matchesFilter(filter, act1Ref))
                .toBe(false);
            expect(matchesFilter(filter, act2Ref))
                .toBe(true);
            expect(matchesFilter(filter, act3Ref))
                .toBe(false);
        }
    );

    it('act filter does not match other books',
        () => {
            const filter: BookFilter = {
                type: 'act',
                book: 'The Legion of Shadow',
                act: 1
            };

            expect(matchesFilter(filter, otherBookRef))
                .toBe(false);
        }
    );
});
