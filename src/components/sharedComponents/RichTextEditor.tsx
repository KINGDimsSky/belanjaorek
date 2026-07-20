"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "../ui/button";
import { TextAlign } from "@tiptap/extension-text-align";
import { Bold, Italic, Strikethrough, List, ListOrdered, Quote, AlignLeft, AlignCenter, AlignRight, AlignJustify, Undo, Redo, Code,} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5],
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[180px] p-3 border border-input rounded-md focus:outline-none bg-background " +
          "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:my-2 " +
          "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:my-2 " +
          "[&_h3]:text-xl [&_h3]:font-bold [&_h3]:my-1 " +
          "[&_h4]:text-lg [&_h4]:font-semibold [&_h4]:my-1 " +
          "[&_h5]:text-base [&_h5]:font-semibold " +
          "[&_p]:my-1 " +
          "[&_ul]:list-disc [&_ul]:ml-5 [&_ul]:my-2 " +
          "[&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:my-2 " +
          "[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-2 " +
          "[&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-1 p-1.5 border border-input rounded-md bg-muted/50">
        {[1, 2, 3, 4, 5].map((level) => (
          <Button
            key={level}
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 })
                .run()
            }
            className={`h-8 w-8 p-0 font-bold ${
              editor.isActive("heading", { level })
                ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                : ""
            }`}
          >
            H{level}
          </Button>
        ))}

        <div className="h-4 w-[1px] bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive("bold")
              ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              : ""
          }`}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive("italic")
              ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              : ""
          }`}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive("strike")
              ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              : ""
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive("code")
              ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              : ""
          }`}
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </Button>

        <div className="h-4 w-[1px] bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive("bulletList")
              ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              : ""
          }`}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive("orderedList")
              ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              : ""
          }`}
          title="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive("blockquote")
              ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              : ""
          }`}
          title="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </Button>

        <div className="h-4 w-[1px] bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive({ textAlign: "left" })
              ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              : ""
          }`}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive({ textAlign: "center" })
              ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              : ""
          }`}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive({ textAlign: "right" })
              ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              : ""
          }`}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive({ textAlign: "justify" })
              ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              : ""
          }`}
          title="Align Justify"
        >
          <AlignJustify className="h-4 w-4" />
        </Button>

        <div className="h-4 w-[1px] bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="h-8 w-8 p-0"
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="h-8 w-8 p-0"
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}

