"use client"

import { useEffect, useState } from "react"
import { EditorState } from "@codemirror/state"
import { EditorView, keymap, lineNumbers, highlightActiveLine } from "@codemirror/view"
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands"
import {
  indentOnInput,
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
  foldGutter,
  indentUnit,
} from "@codemirror/language"
import { javascript } from "@codemirror/lang-javascript"
import { python } from "@codemirror/lang-python"
import { cpp } from "@codemirror/lang-cpp"
import { java } from "@codemirror/lang-java"
import { oneDark } from "@codemirror/theme-one-dark"

interface UseCodemirrorProps {
  container: HTMLElement | null
  value: string
  onChange?: (value: string) => void
  language?: string
  theme?: "light" | "dark"
  fontSize?: string
}

export function useCodemirror({
  container,
  value,
  onChange,
  language = "javascript",
  theme = "light",
  fontSize = "16px",
}: UseCodemirrorProps) {
  const [view, setView] = useState<EditorView | null>(null)

  useEffect(() => {
    if (!container) return

    // Clean up previous view
    if (view) {
      view.destroy()
    }

    // Language extension based on selected language
    const getLangExtension = () => {
      switch (language) {
        case "javascript":
          return javascript()
        case "python":
          return python()
        case "cpp":
          return cpp()
        case "java":
          return java()
        default:
          return javascript()
      }
    }

    // Theme extension
    const themeExtension = theme === "dark" ? oneDark : []

    // Create editor state
    const state = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        history(),
        indentOnInput(),
        bracketMatching(),
        foldGutter(),
        syntaxHighlighting(defaultHighlightStyle),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        indentUnit.of("    "), // 4 spaces for indentation
        getLangExtension(),
        themeExtension,
        EditorView.updateListener.of((update) => {
          if (update.docChanged && onChange) {
            onChange(update.state.doc.toString())
          }
        }),
        EditorView.theme({
          "&": {
            fontSize: fontSize,
            height: "100%",
            minHeight: "400px",
          },
          ".cm-scroller": {
            fontFamily: "monospace",
            overflow: "auto",
          },
          ".cm-content": {
            caretColor: theme === "dark" ? "#fff" : "#000",
          },
          ".cm-cursor": {
            borderLeftColor: theme === "dark" ? "#fff" : "#000",
            borderLeftWidth: "2px",
          },
          ".cm-activeLine": {
            backgroundColor: theme === "dark" ? "#2c313a" : "#f8f9fa",
          },
          ".cm-gutters": {
            backgroundColor: theme === "dark" ? "#282c34" : "#f8f9fa",
            color: theme === "dark" ? "#676f7d" : "#6c757d",
            border: "none",
          },
          ".cm-activeLineGutter": {
            backgroundColor: theme === "dark" ? "#2c313a" : "#e9ecef",
          },
        }),
      ],
    })

    // Create and mount the editor view
    const newView = new EditorView({
      state,
      parent: container,
    })

    setView(newView)

    return () => {
      if (newView) {
        newView.destroy()
      }
    }
  }, [container, language, theme, fontSize])

  // Update content when value changes externally
  useEffect(() => {
    if (view && value !== view.state.doc.toString()) {
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: value,
        },
      })
    }
  }, [value, view])

  return view
}
