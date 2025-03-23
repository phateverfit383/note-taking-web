'use client';

import React, { Suspense, useEffect, useState } from 'react';
import MarkdownEditor from '@/components/markdown/MarkdownEditor';
import { getNoteBySlug } from '@/services/preview/request';
import { Note } from '@/services/notes/type';
import { useSearchParams } from 'next/navigation';

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState(searchParams.get('slug') || '');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // initial load
  useEffect(() => {
    if (slug) {
      setLoading(true);
      getNoteBySlug(slug).then((res) => {
        setSelectedNote(res);
        setLoading(false);
      });
    }
  }, [slug]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='min-h-screen bg-gray-900 text-white p-8'>
        <div className='flex w-full mb-8'>
          <div className='flex justify-center items-center'>
            <h1>{selectedNote?.title || slug}</h1>
          </div>
        </div>
        <div className='flex'>
          <div className='flex space-x-4'>
            <MarkdownEditor text={selectedNote?.content || ''} isPreview />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
