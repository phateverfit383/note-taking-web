'use client';

import React, { useEffect, useState } from 'react';
import MarkdownEditor from '@/components/markdown/MarkdownEditor';
import { getNoteBySlug } from '@/services/preview/request';
import { Note } from '@/services/notes/type';
import { useSearchParams } from 'next/navigation';

export default function PreviewPage() {
  // const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  // get slug from url
  // const slug = searchParams.get('slug');

  // initial load
  // useEffect(() => {
  //   if (slug) {
  //     getNoteBySlug(slug).then((res) => {
  //       setSelectedNote(res);
  //     });
  //   }
  // }, []);

  return (
    <div className='min-h-screen bg-gray-900 text-white p-8'>
      <div className='flex w-full mb-8'>
        <div className='flex justify-center items-center'>
          <h1>{selectedNote?.title}</h1>
        </div>
      </div>
      <div className='flex'>
        <div className='flex space-x-4'>
          <MarkdownEditor text={selectedNote?.content || ''} isPreview />
        </div>
      </div>
    </div>
  );
}
