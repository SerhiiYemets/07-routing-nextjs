"use client";

import { useState, useEffect } from "react";
import css from "./NotesClient.module.css";
import {
    useQuery,
    keepPreviousData,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function NotesClient() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");

    const perPage = 8;

    const { data, isLoading} = useQuery({
        queryKey: ["notes", currentPage, perPage, search],
        queryFn: () => fetchNotes(currentPage, perPage, search || undefined),
        placeholderData: keepPreviousData,
    });

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    
    useEffect(() => {
    const t = setTimeout(() => {
        setSearch(searchInput.trim());
        setCurrentPage(1);
    }, 500);
    return () => clearTimeout(t);
}, [searchInput]);

    const hasResults = !!data?.notes?.length;
    const totalPages = data?.totalPages ?? 1;
    
    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={searchInput} onChange={setSearchInput}/>
                <button className={css.button} onClick={handleOpenModal}>
                    Create note +
                </button>
            </header>
            
            <main className="notes-list">
                {hasResults && totalPages > 1 && (
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onSelectPage={setCurrentPage}
                    />
                )}
                
                {data && !isLoading && <NoteList notes={data.notes ?? []} />}

                {isModalOpen && (
                    <Modal onClose={handleCloseModal}>
                        <NoteForm onClose={handleCloseModal} />
                    </Modal>
                )}
            </main>
        </div>
    );
}
