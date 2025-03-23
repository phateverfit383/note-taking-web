"use client";

import React, { useEffect, useState } from "react";
import { Note } from "../api/notes/type";
import MarkdownEditor from "@/components/markdown/MarkdownEditor";
import { useSearchParams } from "next/navigation";
import { getNoteBySlug } from "../api/preview/route";

export default function PreviewPage() {
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  // get slug from url
  const searchParams = useSearchParams();
  console.log("searchParams", searchParams);
  const slug = searchParams.get("slug");

  // initial load
  useEffect(() => {
    console.log("slug", slug);
    if (slug) {
      getNoteBySlug(slug).then((res) => {
        setSelectedNote(res);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex w-full mb-8">
        <div className="flex justify-center items-center">
          <h1>{selectedNote?.title}</h1>
        </div>
      </div>
      <div className="flex">
        {/* Content */}
        <div className="flex space-x-4">
          <MarkdownEditor text={selectedNote?.content || ""} isPreview />
        </div>
      </div>
    </div>
  );
}
