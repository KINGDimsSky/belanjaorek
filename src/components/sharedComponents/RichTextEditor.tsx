'use client'

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit" 
import { Button } from "../ui/button";

interface RichTextEditorProps {
    value: string,
    onChange : (value : string) => void;
}

export default function RichTextEditor ({value, onChange} : RichTextEditorProps) {
    const editor = useEditor({
        extensions : [StarterKit],
        content : value,
        editorProps : {
            attributes : {
                class : "prose prose-sm dark:prose-invert min-h-[150px] p-3 border border-input rounded-md focus:outline-none"
            },
        },
        onUpdate : ({editor}) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    return (
        <div className="flex flex-col gap-2">
           <div className="flex gap-2 p-1 border border-input rounded-md bg-muted">
             <Button variant={'outline'}  type="button" onClick={() => editor.chain().focus().toggleBold().run()}
               className={`p-1 px-2 rounded-md ${editor.isActive("bold") ? "bg-primary text-primary-foreground" : "bg-transparent"}`}>
              Bold
             </Button>
             <Button variant={'outline'} type="button" onClick={() => editor.chain().focus().toggleItalic().run()}
               className={`p-1 px-2 rounded-md ${editor.isActive("italic") ? "bg-primary text-primary-foreground" : "bg-transparent"}`}>
              Italic
             </Button>
           </div>
      {/* AREA TEKS */}
      <EditorContent editor={editor} /> 
        </div>
    )
}