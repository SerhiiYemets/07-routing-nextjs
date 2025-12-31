import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes, NotesResponse } from "@/lib/api";

export default async function NotesPage() {
    const queryClient = new QueryClient();
    
    await queryClient.prefetchQuery<NotesResponse>({
        queryKey: ["notes", 1, 8, ""],
        queryFn: () => fetchNotes(1, 8),
    });
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient />
        </HydrationBoundary>
    );
}