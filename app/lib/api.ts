import axios from "axios";
import type { Note, NewNote } from "../types/note"

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export const fetchNotes = async (query: string, page: number): Promise<FetchNotesResponse> => {
    const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const endPoint = "/notes"

    const params = {
        search: query,
        page,
        perPage: 12
    }
    const response = await axios.get<FetchNotesResponse>(endPoint, {
        params,
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    });
    return response.data
}

export const createNote = async(note: NewNote) => {
    const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const endPoint = '/notes';

    const response = await axios.post<Note>(endPoint, note, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    });
    
    return response.data;
}

export const deleteNote = async(id: string) => {
    const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const endPoint = `/notes/${id}`;

    const response = await axios.delete<Note>(endPoint, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    });

    return response.data;
}
