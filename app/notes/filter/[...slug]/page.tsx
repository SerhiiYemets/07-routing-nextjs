'use client';

import { useQuery } from '@tanstack/react-query';
import NotesList from '@/components/NoteList/NoteList';
import { fetchNotes, NotesResponse } from '@/lib/api';
import { use } from 'react';

interface NotesPageProps {
    params: Promise<{ slug?: string[] }>;
}

export default function NotesPage({ params }: NotesPageProps) {
    const resolvedParams = use(params);
    const tag = resolvedParams.slug?.[0] ?? 'all';

    const { data, isLoading, error } = useQuery<NotesResponse>({
        queryKey: ['notes', tag],
        queryFn: () => fetchNotes(1, 8, undefined, tag === 'all' ? undefined : tag),
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading notes</p>;

    return <NotesList notes={data?.notes || []} />;
}