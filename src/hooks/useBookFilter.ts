import { useState } from 'react';
import { BookRef } from '../types/bookRef';

export interface BookInfo {
    book: string;
    acts: number[];
}

export const BOOKS: BookInfo[] = [
    {
        book: 'The Legion of Shadow',
        acts: [1, 2, 3]
    }
];

export type BookFilter =
    | { type: 'all' }
    | { type: 'book'; book: string }
    | { type: 'act'; book: string; act: number };

const STORAGE_KEY = 'dq-book-filter-v1';

function loadFilter(): BookFilter {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved) as BookFilter;
        }
    } catch {
        // ignore
    }
    return { type: 'all' };
}

function saveFilter(filter: BookFilter): void {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(filter)
    );
}

export function matchesFilter(
    filter: BookFilter,
    bookRef: BookRef
): boolean {
    switch (filter.type) {
        case 'all':
            return true;
        case 'book':
            return bookRef.book === filter.book;
        case 'act':
            return (
                bookRef.book === filter.book &&
                bookRef.act === filter.act
            );
    }
}

export function useBookFilter() {
    const [filter, setFilterState] =
        useState<BookFilter>(loadFilter);

    const setFilter = (newFilter: BookFilter) => {
        setFilterState(newFilter);
        saveFilter(newFilter);
    };

    const filterFn = (bookRef: BookRef): boolean =>
        matchesFilter(filter, bookRef);

    return { filter, setFilter, filterFn };
}
