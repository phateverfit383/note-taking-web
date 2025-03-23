'use client';

import clsx from 'clsx';
import { Check, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  searchNotes,
  createNote,
  updateNote,
  deleteNote,
} from '@/services/notes/request';
import { Note } from '@/services/notes/type';
import MarkdownEditor from '@/components/markdown/MarkdownEditor';
import ConfirmationPopup from '@/components/popup/confirm';
import { removeToken } from '@/lib/storage';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { NEXT_PUBLIC_APP_URL } from '@/constant/env';
export default function NotesPage() {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [search, setSearch] = useState('');
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const router = useRouter();

  const createNoteHandler = async () => {
    console.log('createNoteHandler', noteTitle);
    if (selectedNote) {
      await updateNote(selectedNote._id, noteTitle, markdown);
    } else {
      console.log('createNoteHandler', noteTitle, markdown);
      const res = await createNote(noteTitle, markdown);
      console.log('res', res);
      setNotes([...notes, res]);
    }
  };

  const selectNoteHandler = (note: Note) => {
    setSelectedNote(note);
    setNoteTitle(note.title);
    setMarkdown(note.content);
  };

  const openConfirmationPopup = () => {
    setIsConfirmationPopupOpen(true);
  };

  // handle delete note
  const deleteNoteHandler = async () => {
    setIsConfirmationPopupOpen(false);
    if (selectedNote) {
      await deleteNote(selectedNote._id);
      setNotes(notes.filter((note) => note._id !== selectedNote._id));
      if (notes.length > 0) {
        setSelectedNote(notes[0]);
        setNoteTitle(notes[0].title);
        setMarkdown(notes[0].content);
      } else {
        setNoteTitle('');
        setMarkdown('');
        setSelectedNote(null);
      }
    }
  };

  // handle share note
  const shareNoteHandler = async () => {
    // copy to clipboard
    navigator.clipboard.writeText(
      `${NEXT_PUBLIC_APP_URL}/preview?slug=${selectedNote?.slug}`
    );
    toast.success('Copied to clipboard');
  };

  // after 300ms of no change, search notes
  useEffect(() => {
    const timeout = setTimeout(() => {
      searchNotes(search).then((res) => {
        setNotes(res);
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  // initial load
  useEffect(() => {
    searchNotes(undefined).then((res) => {
      setNotes(res);
    });
  }, []);

  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <div className='flex'>
        {/* Sidebar */}
        <div className='w-1/4 p-6 border-r border-gray-700'>
          <div className='mb-6'>
            <input
              type='text'
              placeholder='Search all components'
              className='w-full p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ul className='space-y-2'>
            <li
              className='text-gray-400 flex items-center gap-2'
              onClick={() => {
                setSelectedNote(null);
                setNoteTitle('');
                setMarkdown('');
              }}
            >
              <Plus /> New Note
            </li>
            {notes.map((note) => (
              <li
                className='text-gray-400'
                onClick={() => selectNoteHandler(note)}
                key={note._id}
              >
                {note.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className='w-3/4 p-6'>
          <div className='flex justify-end items-center mb-4'>
            <button
              className='p-2 bg-red-600 rounded hover:bg-red-500'
              onClick={() => {
                removeToken();
                router.push('/login');
              }}
            >
              <span className='text-white'>Logout</span>
            </button>
          </div>
          <div className='flex justify-between items-center mb-4'>
            <div className='flex space-x-2 w-full mr-4'>
              <input
                type='text'
                className='w-full p-2 bg-gray-800  rounded text-white'
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
              />
            </div>
            <div className='flex space-x-2'>
              <button
                className='p-2 bg-gray-800 rounded hover:bg-gray-700'
                onClick={() => createNoteHandler()}
              >
                <span className='text-green-500'>Save</span>
              </button>
              {selectedNote && (
                <>
                  <button
                    className='p-2 bg-gray-800 rounded hover:bg-gray-700'
                    onClick={() => shareNoteHandler()}
                  >
                    <span className='text-gray-400'>Share</span>
                  </button>
                  <button
                    className='p-2 bg-red-600 rounded hover:bg-red-500'
                    onClick={() => openConfirmationPopup()}
                  >
                    <span className='text-white'>Delete</span>
                  </button>
                </>
              )}
            </div>
          </div>
          {/* Content */}
          <div className='flex space-x-4'>
            <MarkdownEditor text={markdown} onChange={setMarkdown} />
          </div>
        </div>
      </div>

      <ConfirmationPopup
        isOpen={isConfirmationPopupOpen}
        onClose={() => setIsConfirmationPopupOpen(false)}
        onConfirm={() => deleteNoteHandler()}
        title='Confirm'
        message='Are you sure you want to delete this note?'
      />
    </div>
  );
}
