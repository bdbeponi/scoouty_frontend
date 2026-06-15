"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Link } from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Image } from "@tiptap/extension-image";
import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Dropcursor } from "@tiptap/extension-dropcursor";
import { useEffect, useRef, useState } from "react";
import {
  FiBold,
  FiItalic,
  FiList,
  FiLink,
  FiCode,
  FiUnderline,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiAlignJustify,
  FiImage,
  FiTable,
  FiType,
  FiTrash2,
  FiArrowDown,
  FiArrowRight,
  FiMinus,
  FiMaximize2,
  FiMinimize2,
  FiMove,
} from "react-icons/fi";
import {
  MdFormatQuote,
  MdFormatListNumbered,
  MdFormatListBulleted,
  MdHorizontalRule,
  MdUndo,
  MdRedo,
} from "react-icons/md";
import { debounce } from "lodash";

// Custom Image extension WITHOUT float - text will NOT wrap around image
const BlockImage = Image.extend({
  name: "blockImage",

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      // We'll handle everything through CSS
      width: {
        default: "auto",
        parseHTML: (element) => {
          const width = element.getAttribute("width") || element.style.width;
          return width ? width.replace("px", "") : "auto";
        },
        renderHTML: (attributes) => {
          // We don't set width/height attributes, let CSS handle it
          return {};
        },
      },
      align: {
        default: "block",
        parseHTML: (element) => element.getAttribute("data-align") || "block",
        renderHTML: (attributes) => {
          const align = attributes.align || "block";
          return {
            "data-align": align,
            class: `editor-image ${align}-aligned`,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      setBlockImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
      setImageAlign:
        (align) =>
        ({ commands }) => {
          return commands.updateAttributes("blockImage", { align });
        },
      setImageWidth:
        (width) =>
        ({ commands }) => {
          return commands.updateAttributes("blockImage", { width });
        },
      setImageHeight:
        (height) =>
        ({ commands }) => {
          return commands.updateAttributes("blockImage", { height });
        },
    };
  },

  // Make image a block node (not inline)
  inline: false,
  group: "block",
});

// Custom Table Cell
const WorkingTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          if (attributes.style) {
            return { style: attributes.style };
          }
          return {};
        },
      },
    };
  },
});

const WorkingTableHeader = TableHeader.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          if (attributes.style) {
            return { style: attributes.style };
          }
          return {};
        },
      },
    };
  },
});

// Custom Table extension with responsive wrapper
const ResponsiveTable = Table.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      {
        class: "table-responsive-wrapper",
        style:
          "width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 1rem 0;",
      },
      [
        "table",
        {
          ...HTMLAttributes,
          class: `${HTMLAttributes.class || ""} responsive-table`,
          style: "min-width: 100%; border-collapse: collapse; width: 100%;",
        },
        ["tbody", 0],
      ],
    ];
  },
});

// Simple Background Color extension - FIXED VERSION
const BackgroundColor = TextStyle.extend({
  name: "backgroundColor",

  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.style.backgroundColor,
        renderHTML: (attributes) => {
          if (!attributes.backgroundColor) {
            return {};
          }
          return {
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      setBackgroundColor:
        (backgroundColor) =>
        ({ chain }) => {
          return chain().setMark(this.name, { backgroundColor }).run();
        },
      unsetBackgroundColor:
        () =>
        ({ chain }) => {
          return chain()
            .setMark(this.name, { backgroundColor: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});

// Simple Font Size extension - FIXED VERSION
const FontSize = TextStyle.extend({
  name: "fontSize",

  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: (element) => {
          const fontSize = element.style.fontSize;
          if (fontSize) {
            // Convert px to pt if needed
            if (fontSize.includes("px")) {
              const pxValue = parseFloat(fontSize);
              return `${Math.round(pxValue * 0.75)}pt`; // 1px ≈ 0.75pt
            }
            return fontSize;
          }
          return null;
        },
        renderHTML: (attributes) => {
          if (!attributes.fontSize) {
            return {};
          }
          // Ensure value is in pt
          let fontSizeValue = attributes.fontSize;
          if (fontSizeValue.includes("px")) {
            const pxValue = parseFloat(fontSizeValue);
            fontSizeValue = `${Math.round(pxValue * 0.75)}pt`;
          }
          return {
            style: `font-size: ${fontSizeValue}`,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          // Convert px to pt if provided in px
          let fontSizeValue = fontSize;
          if (fontSizeValue.includes("px")) {
            const pxValue = parseFloat(fontSizeValue);
            fontSizeValue = `${Math.round(pxValue * 0.75)}pt`;
          }
          return chain().setMark(this.name, { fontSize: fontSizeValue }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark(this.name, { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});

// Simple Font Family extension - FIXED VERSION
const FontFamily = TextStyle.extend({
  name: "fontFamily",

  addAttributes() {
    return {
      ...this.parent?.(),
      fontFamily: {
        default: null,
        parseHTML: (element) => element.style.fontFamily,
        renderHTML: (attributes) => {
          if (!attributes.fontFamily) {
            return {};
          }
          return {
            style: `font-family: ${attributes.fontFamily}`,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      setFontFamily:
        (fontFamily) =>
        ({ chain }) => {
          return chain().setMark(this.name, { fontFamily }).run();
        },
      unsetFontFamily:
        () =>
        ({ chain }) => {
          return chain()
            .setMark(this.name, { fontFamily: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});

// Function to clean Word/Google Docs HTML while preserving formatting
// Function to clean Word/Google Docs HTML while preserving formatting
// FIXED VERSION: Function to clean Word/Google Docs HTML
const cleanWordHTML = (html) => {
  if (!html) return "";

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // 1. Remove all <br> tags - এইগুলোই extra spacing এর কারণ
  const removeExcessiveLineBreaks = (element) => {
    const allElements = element.querySelectorAll("*");

    allElements.forEach((el) => {
      // Check for multiple consecutive <br> tags
      const childNodes = Array.from(el.childNodes);
      let brCount = 0;
      let lastBrIndex = -1;

      childNodes.forEach((child, index) => {
        if (child.nodeType === Node.ELEMENT_NODE && child.tagName === "BR") {
          brCount++;
          lastBrIndex = index;

          // Keep only the first <br> in a sequence, remove the rest
          if (brCount > 1) {
            child.remove();
          }
        } else if (child.nodeType === Node.TEXT_NODE) {
          // Reset BR count when we hit text
          brCount = 0;
        }
      });

      // Also clean up text nodes with multiple newlines
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      const textNodes = [];
      let node;
      while ((node = walker.nextNode())) {
        textNodes.push(node);
      }

      textNodes.forEach((textNode) => {
        let text = textNode.textContent;
        // Replace multiple newlines with single newline
        text = text.replace(/\n{2,}/g, "\n");
        textNode.textContent = text;
      });
    });

    // Remove empty paragraphs
    const paragraphs = element.querySelectorAll("p, div");
    paragraphs.forEach((p) => {
      // Check if paragraph is empty or only contains whitespace/BR
      const children = Array.from(p.childNodes);
      const hasOnlyBr =
        children.length === 1 &&
        children[0].nodeType === Node.ELEMENT_NODE &&
        children[0].tagName === "BR";

      const hasOnlyWhitespace = p.textContent.trim() === "";

      if (hasOnlyBr || hasOnlyWhitespace) {
        p.remove();
      }
    });
  };

  removeExcessiveLineBreaks(tempDiv);

  // 2. Combine short consecutive paragraphs into one
  const combineShortParagraphs = (element) => {
    const paragraphs = Array.from(element.querySelectorAll("p, div.MsoNormal"));

    for (let i = 0; i < paragraphs.length - 1; i++) {
      const current = paragraphs[i];
      const next = paragraphs[i + 1];

      if (!current || !next) continue;

      const currentText = current.textContent.trim();
      const nextText = next.textContent.trim();

      // If current paragraph doesn't end with sentence-ending punctuation
      // and next paragraph is short, combine them
      const endsWithPunctuation = /[.!?:]$/.test(currentText);
      const nextIsShort = nextText.length < 100;
      const nextStartsWithLowercase = /^[a-z]/.test(nextText);

      if (!endsWithPunctuation && (nextIsShort || nextStartsWithLowercase)) {
        // Add a space and the next paragraph's content
        if (current.innerHTML.endsWith("</span>")) {
          // If ends with a span, add space before the closing tag
          current.innerHTML =
            current.innerHTML.replace(/<\/span>$/, " </span>") + next.innerHTML;
        } else {
          current.innerHTML += " " + next.innerHTML;
        }
        next.remove();
      }
    }
  };

  combineShortParagraphs(tempDiv);

  // 3. Preserve basic formatting
  const preserveFormatting = (element) => {
    // Keep bold, italic, underline
    const boldElements = element.querySelectorAll("strong, b");
    boldElements.forEach((el) => {
      if (!el.hasAttribute("style")) {
        el.style.fontWeight = "bold";
      }
    });

    const italicElements = element.querySelectorAll("em, i");
    italicElements.forEach((el) => {
      if (!el.hasAttribute("style")) {
        el.style.fontStyle = "italic";
      }
    });

    const underlineElements = element.querySelectorAll("u");
    underlineElements.forEach((el) => {
      if (!el.hasAttribute("style")) {
        el.style.textDecoration = "underline";
      }
    });

    // Remove Word-specific classes
    const elementsWithClass = element.querySelectorAll("[class]");
    elementsWithClass.forEach((el) => {
      const classes = Array.from(el.classList);
      if (classes.some((cls) => cls.startsWith("Mso"))) {
        el.removeAttribute("class");
      }
    });
  };

  preserveFormatting(tempDiv);

  return tempDiv.innerHTML;
};

// Function to detect if HTML is from Word
const isFromWord = (html) => {
  return (
    html.includes('xmlns:o="urn:schemas-microsoft-com') ||
    html.includes('xmlns:w="urn:schemas-microsoft-com') ||
    html.includes('class="Mso') ||
    html.includes("mso-") ||
    html.includes("MsoNormal")
  );
};

// Better paste handler for Word/Docs content
const handleWordPaste = (view, html, text) => {
  try {
    // Clean the Word HTML
    const cleanedHTML = cleanWordHTML(html);

    // Create a temporary element to hold the cleaned HTML
    const temp = document.createElement("div");
    temp.innerHTML = cleanedHTML;

    // Convert to TipTap format
    const convertToTipTapFormat = (element) => {
      let result = "";

      const walk = (node, depth = 0) => {
        if (node.nodeType === Node.TEXT_NODE) {
          result += node.textContent;
          return;
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
          const tagName = node.tagName.toLowerCase();

          switch (tagName) {
            case "p":
              if (depth === 0) result += "\n";
              Array.from(node.childNodes).forEach((child) =>
                walk(child, depth + 1),
              );
              result += "\n";
              break;

            case "br":
              result += "\n";
              break;

            case "h1":
            case "h2":
            case "h3":
            case "h4":
            case "h5":
            case "h6":
              result += "\n";
              Array.from(node.childNodes).forEach((child) =>
                walk(child, depth + 1),
              );
              result += "\n";
              break;

            case "ul":
            case "ol":
              // Don't add extra newlines for lists - let list items handle it
              Array.from(node.childNodes).forEach((child) =>
                walk(child, depth + 1),
              );
              break;

            case "li":
              if (
                node.parentNode &&
                node.parentNode.tagName.toLowerCase() === "ol"
              ) {
                // For ordered lists, TipTap will handle numbering
                result += "\n";
                Array.from(node.childNodes).forEach((child) =>
                  walk(child, depth + 1),
                );
              } else {
                // For unordered lists
                result += "\n";
                Array.from(node.childNodes).forEach((child) =>
                  walk(child, depth + 1),
                );
              }
              break;

            case "strong":
            case "b":
              // Bold will be applied by TipTap
              Array.from(node.childNodes).forEach((child) =>
                walk(child, depth + 1),
              );
              break;

            case "em":
            case "i":
              // Italic will be applied by TipTap
              Array.from(node.childNodes).forEach((child) =>
                walk(child, depth + 1),
              );
              break;

            case "u":
              // Underline will be applied by TipTap
              Array.from(node.childNodes).forEach((child) =>
                walk(child, depth + 1),
              );
              break;

            default:
              Array.from(node.childNodes).forEach((child) =>
                walk(child, depth + 1),
              );
              break;
          }
        }
      };

      walk(element);
      return result;
    };

    const convertedText = convertToTipTapFormat(temp);

    // Insert the text
    const { state, dispatch } = view;
    const { from, to } = state.selection;

    // First insert the plain text
    dispatch(state.tr.insertText(convertedText, from, to));

    // Now apply formatting
    const editor = view.state.doc;
    const textContent = convertedText;

    // Apply lists if detected
    if (temp.querySelector("ol")) {
      // Select the inserted text and make it an ordered list
      const endPos = from + convertedText.length;
      const selection = state.selection.constructor.create(
        state.doc,
        from,
        endPos,
      );
      view.dispatch(state.tr.setSelection(selection));
      view.dispatch(
        state.tr.setBlockType(from, endPos, state.schema.nodes.orderedList),
      );
    }

    if (temp.querySelector("ul")) {
      // Select the inserted text and make it a bullet list
      const endPos = from + convertedText.length;
      const selection = state.selection.constructor.create(
        state.doc,
        from,
        endPos,
      );
      view.dispatch(state.tr.setSelection(selection));
      view.dispatch(
        state.tr.setBlockType(from, endPos, state.schema.nodes.bulletList),
      );
    }

    return true;
  } catch (error) {
    console.error("Word paste error:", error);
    return false;
  }
};

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  defaultHeight = "800px",
  minHeight = "300px",
  maxHeight = "800px",
}) {
  const fileInputRef = useRef(null);
  const [mediaUploading, setMediaUploading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showTableMenu, setShowTableMenu] = useState(false);
  const [showImageMenu, setShowImageMenu] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [selectedImage, setSelectedImage] = useState(null);

  const [editorHeight, setEditorHeight] = useState(defaultHeight);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);

  // State for text properties
  const [selectedTextProperties, setSelectedTextProperties] = useState({
    fontSize: null,
    fontFamily: null,
    color: null,
    backgroundColor: null,
    bold: false,
    italic: false,
    underline: false,
    align: "left",
    headingLevel: null,
  });

  // Debounced onChange handler
  const debouncedOnChange = useRef(
    debounce((content) => {
      if (onChange) onChange(content);
    }, 300),
  );

  useEffect(() => {
    setIsMounted(true);

    // Cleanup function
    return () => {
      debouncedOnChange.current.cancel();
    };
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: true,
        },
        history: true,
      }),
      TextStyle,
      Color, // Color extension for text color
      Underline,
      BackgroundColor, // Custom extension for background color
      FontSize, // Custom extension for font size
      FontFamily, // Custom extension for font family
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-blue-600 hover:underline",
          rel: "noopener noreferrer nofollow",
          target: "_blank",
        },
      }),
      BlockImage.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto cursor-move",
          draggable: "true",
        },
      }),
      ResponsiveTable.configure({
        resizable: false, // Disable resizable since we're handling it differently
        HTMLAttributes: {
          class: "border-collapse border border-gray-300 w-full my-4",
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: "border border-gray-300",
        },
      }),
      WorkingTableCell.configure({
        HTMLAttributes: {
          class:
            "border border-gray-300 px-2 md:px-4 py-2 align-top min-w-[50px] md:min-w-[100px] break-words",
        },
      }),
      WorkingTableHeader.configure({
        HTMLAttributes: {
          class:
            "border border-gray-300 bg-gray-50 px-2 md:px-4 py-2 font-semibold align-top break-words",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Placeholder.configure({
        placeholder: placeholder || "Start writing or paste from Word/Docs...",
      }),
      Dropcursor.configure({
        width: 2,
        color: "#3b82f6",
      }),
    ],
    content: value || "",
    onUpdate: ({ editor: e }) => {
      debouncedOnChange.current(e.getHTML());
    },
    onSelectionUpdate: ({ editor: e }) => {
      const { from, to } = e.state.selection;

      // Check if an image is within the selection
      let imageFound = false;
      e.state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type.name === "blockImage") {
          setSelectedImage(node);
          setShowImageMenu(true);
          imageFound = true;
          return false; // Stop searching
        }
      });

      if (!imageFound) {
        setSelectedImage(null);
        setShowImageMenu(false);
      }

      // Update text properties based on selection
      updateTextProperties(e);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none px-6 py-5 focus:outline-none focus:ring-0 h-full",
        spellcheck: "true",
      },
      handlePaste: (view, event) => {
        const html = event.clipboardData?.getData("text/html");
        const text = event.clipboardData?.getData("text/plain");

        if (html && isFromWord(html)) {
          event.preventDefault();

          try {
            // Clean the HTML
            const cleanedHTML = cleanWordHTML(html);

            // Create temporary div to process
            const temp = document.createElement("div");
            temp.innerHTML = cleanedHTML;

            // Convert to plain text with SINGLE line breaks
            const convertToSingleSpacedText = (element) => {
              let result = "";

              const processNode = (node, isInParagraph = false) => {
                if (node.nodeType === Node.TEXT_NODE) {
                  let text = node.textContent;

                  // Replace multiple newlines with single newline
                  text = text.replace(/\n{2,}/g, "\n");

                  // If we're in a paragraph and text starts with newline, remove it
                  if (isInParagraph && text.startsWith("\n")) {
                    text = text.substring(1);
                  }

                  result += text;
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                  const tagName = node.tagName.toLowerCase();

                  if (tagName === "p" || tagName === "div") {
                    // Start of new paragraph
                    if (result && !result.endsWith("\n\n")) {
                      result += "\n";
                    }

                    // Process children as part of this paragraph
                    Array.from(node.childNodes).forEach((child) =>
                      processNode(child, true),
                    );

                    // End paragraph with single newline
                    if (!result.endsWith("\n")) {
                      result += "\n";
                    }
                  } else if (tagName === "br") {
                    // Single line break (not paragraph break)
                    if (!result.endsWith("\n")) {
                      result += "\n";
                    }
                  } else if (
                    ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tagName)
                  ) {
                    // Headings - treat as paragraphs
                    if (result && !result.endsWith("\n\n")) {
                      result += "\n";
                    }

                    Array.from(node.childNodes).forEach((child) =>
                      processNode(child, true),
                    );

                    result += "\n";
                  } else {
                    // Inline elements - process normally
                    Array.from(node.childNodes).forEach((child) =>
                      processNode(child, isInParagraph),
                    );
                  }
                }
              };

              Array.from(element.childNodes).forEach((node) =>
                processNode(node, false),
              );
              return result;
            };

            let plainText = convertToSingleSpacedText(temp);

            // Final cleanup: ensure maximum of 2 consecutive newlines
            plainText = plainText.replace(/\n{3,}/g, "\n\n");

            // Trim and ensure it ends with single newline
            plainText = plainText.trim() + (plainText ? "\n" : "");

            // Insert the text
            const { state, dispatch } = view;
            const { from, to } = state.selection;

            dispatch(state.tr.insertText(plainText, from, to));

            return true;
          } catch (error) {
            console.error("Word paste error:", error);
            // Fallback to plain text with cleanup
            if (text) {
              let cleanedText = text.replace(/\n{3,}/g, "\n\n");
              const { state, dispatch } = view;
              const { from, to } = state.selection;
              dispatch(state.tr.insertText(cleanedText, from, to));
              return true;
            }
          }
        }

        // For non-Word content, let TipTap handle it
        return false;
      },
      handleDrop: (view, event, slice, moved) => {
        event.preventDefault();

        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
          const file = files[0];
          if (file.type.startsWith("image/")) {
            handleImageUpload(file);
            return;
          }
        }

        // Handle image dragging within editor
        const coordinates = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        });
        if (coordinates) {
          view.dispatch(view.state.tr.insert(coordinates.pos, slice));
        }
      },
    },
  });

  // Function to update text properties based on current selection
  const updateTextProperties = (editorInstance) => {
    if (!editorInstance) return;

    const newProperties = {
      fontSize: null,
      fontFamily: null,
      color: null,
      backgroundColor: null,
      bold: editorInstance.isActive("bold"),
      italic: editorInstance.isActive("italic"),
      underline: editorInstance.isActive("underline"),
      align: "left",
      headingLevel: null,
    };

    // Check for text alignment
    if (editorInstance.isActive({ textAlign: "center" })) {
      newProperties.align = "center";
    } else if (editorInstance.isActive({ textAlign: "right" })) {
      newProperties.align = "right";
    } else if (editorInstance.isActive({ textAlign: "justify" })) {
      newProperties.align = "justify";
    }

    // Check for heading level
    for (let i = 1; i <= 6; i++) {
      if (editorInstance.isActive("heading", { level: i })) {
        newProperties.headingLevel = i;
        break;
      }
    }

    // Get color from Color extension
    const colorAttrs = editorInstance.getAttributes("textStyle");
    if (colorAttrs && colorAttrs.color) {
      newProperties.color = colorAttrs.color;
    }

    // Get background color from our custom extension
    const bgColorAttrs = editorInstance.getAttributes("backgroundColor");
    if (bgColorAttrs && bgColorAttrs.backgroundColor) {
      newProperties.backgroundColor = bgColorAttrs.backgroundColor;
    }

    // Get font size from our custom extension
    const fontSizeAttrs = editorInstance.getAttributes("fontSize");
    if (fontSizeAttrs && fontSizeAttrs.fontSize) {
      newProperties.fontSize = fontSizeAttrs.fontSize;
    }

    // Get font family from our custom extension
    const fontFamilyAttrs = editorInstance.getAttributes("fontFamily");
    if (fontFamilyAttrs && fontFamilyAttrs.fontFamily) {
      newProperties.fontFamily = fontFamilyAttrs.fontFamily;
    }

    setSelectedTextProperties(newProperties);
  };

  // Image upload function - স্থানীয়ভাবে image লোড করার জন্য (সার্ভার ছাড়া)
  const handleImageUpload = async (file) => {
    if (!editor) return;

    setMediaUploading(true);

    try {
      // FileReader ব্যবহার করে image পড়বো
      const reader = new FileReader();

      reader.onload = (e) => {
        // Get base64 data
        const base64Data = e.target?.result;

        if (base64Data) {
          // Insert image directly with base64
          editor
            .chain()
            .focus()
            .setBlockImage({
              src: base64Data,
              alt: file.name,
              title: file.name,
              align: "block",
              width: "100%",
            })
            .run();
        }

        setMediaUploading(false);
      };

      reader.onerror = () => {
        console.error("Failed to read file");
        setMediaUploading(false);
      };

      // Read file as data URL (base64)
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading image:", error);
      setMediaUploading(false);
    }
  };

  // Image alignment functions
  const alignImageBlock = () => {
    if (!editor || !selectedImage) return;
    editor.chain().focus().setImageAlign("block").run();
  };

  const alignImageInlineLeft = () => {
    if (!editor || !selectedImage) return;
    editor.chain().focus().setImageAlign("inline-left").run();
  };

  const alignImageInlineRight = () => {
    if (!editor || !selectedImage) return;
    editor.chain().focus().setImageAlign("inline-right").run();
  };

  // Image resize functions
  const resizeImage = (width, height = null) => {
    if (!editor || !selectedImage) return;

    if (height) {
      editor
        .chain()
        .focus()
        .updateAttributes("blockImage", {
          width: width.toString(),
          height: height.toString(),
        })
        .run();
    } else {
      editor
        .chain()
        .focus()
        .updateAttributes("blockImage", { width: width.toString() })
        .run();
    }
  };

  const increaseImageSize = () => {
    if (!editor || !selectedImage) return;
    const currentWidth = parseInt(selectedImage.attrs.width) || 400;
    const newWidth = Math.min(currentWidth + 50, 1200);
    resizeImage(newWidth);
  };

  const decreaseImageSize = () => {
    if (!editor || !selectedImage) return;
    const currentWidth = parseInt(selectedImage.attrs.width) || 400;
    const newWidth = Math.max(currentWidth - 50, 100);
    resizeImage(newWidth);
  };

  const setImageSize = (size) => {
    if (!editor || !selectedImage) return;
    const sizes = {
      small: "200px",
      medium: "400px",
      large: "600px",
      full: "100%",
    };
    resizeImage(sizes[size]);
  };

  const deleteImage = () => {
    if (!editor || !selectedImage) return;
    editor.chain().focus().deleteSelection().run();
    setSelectedImage(null);
    setShowImageMenu(false);
  };

  // Table functions
  const insertTable = (rows = 3, cols = 3) => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: true })
      .run();
    setShowTableMenu(false);
  };

  const addColumnBefore = () => {
    if (!editor) return;
    editor.chain().focus().addColumnBefore().run();
  };

  const addColumnAfter = () => {
    if (!editor) return;
    editor.chain().focus().addColumnAfter().run();
  };

  const deleteColumn = () => {
    if (!editor) return;
    editor.chain().focus().deleteColumn().run();
  };

  const addRowBefore = () => {
    if (!editor) return;
    editor.chain().focus().addRowBefore().run();
  };

  const addRowAfter = () => {
    if (!editor) return;
    editor.chain().focus().addRowAfter().run();
  };

  const deleteRow = () => {
    if (!editor) return;
    editor.chain().focus().deleteRow().run();
  };

  const mergeCells = () => {
    if (!editor) return;
    editor.chain().focus().mergeCells().run();
  };

  const splitCell = () => {
    if (!editor) return;
    editor.chain().focus().splitCell().run();
  };

  const deleteTable = () => {
    if (!editor) return;
    editor.chain().focus().deleteTable().run();
  };

  // Cell background - improved version
  const setCellBackground = (color) => {
    if (!editor) return;

    const view = editor.view;
    const { state } = view;
    const { from } = state.selection;

    const $pos = state.doc.resolve(from);
    let cellPos = null;
    let cellNode = null;

    for (let i = $pos.depth; i > 0; i--) {
      const node = $pos.node(i);
      if (node.type.name === "tableCell" || node.type.name === "tableHeader") {
        cellNode = node;
        cellPos = $pos.before(i + 1); // Use before() for accurate position
        break;
      }
    }

    if (cellNode && cellPos !== null) {
      // Remove existing background styles
      const currentStyle = cellNode.attrs.style || "";
      const cleanedStyle = currentStyle.replace(
        /background-color:[^;]+;?/gi,
        "",
      );

      const newStyle =
        cleanedStyle + (color ? `background-color: ${color};` : "");
      const newAttrs = {
        ...cellNode.attrs,
        style: newStyle.trim(),
      };

      const tr = state.tr.setNodeMarkup(cellPos, null, newAttrs);
      view.dispatch(tr);
    } else {
      // For regular text, use our custom backgroundColor extension
      setHighlightColor(color);
    }
  };

  // Text color - using Color extension
  const setTextColor = (color) => {
    if (!editor) return;
    editor.chain().focus().setColor(color).run();
    setSelectedTextProperties((prev) => ({ ...prev, color }));
  };

  // Text highlight (background color) - FIXED VERSION
  const setHighlightColor = (color) => {
    if (!editor) return;

    // If color is null or undefined, remove the highlight
    if (!color) {
      editor.chain().focus().unsetBackgroundColor().run();
      setSelectedTextProperties((prev) => ({ ...prev, backgroundColor: null }));
    } else {
      // Set the highlight color
      editor.chain().focus().setBackgroundColor(color).run();
      setSelectedTextProperties((prev) => ({
        ...prev,
        backgroundColor: color,
      }));
    }
  };

  // Font size - using our custom extension
  const setFontSize = (size) => {
    if (!editor) return;
    editor.chain().focus().setFontSize(size).run();
    setSelectedTextProperties((prev) => ({ ...prev, fontSize: size }));
  };

  // Font family - using our custom extension
  const setFontFamily = (fontFamily) => {
    if (!editor) return;
    editor.chain().focus().setFontFamily(fontFamily).run();
    setSelectedTextProperties((prev) => ({ ...prev, fontFamily }));
  };

  // Text alignment
  const setTextAlignment = (alignment) => {
    if (!editor) return;
    editor.chain().focus().setTextAlign(alignment).run();
    setSelectedTextProperties((prev) => ({ ...prev, align: alignment }));
  };

  // Remove formatting
  const removeFormatting = () => {
    if (!editor) return;

    // Clear all marks including custom ones
    editor.chain().focus().clearNodes().unsetAllMarks().run();

    // Also explicitly remove custom marks
    editor
      .chain()
      .focus()
      .unsetBackgroundColor()
      .unsetFontSize()
      .unsetFontFamily()
      .run();

    setSelectedTextProperties({
      fontSize: null,
      fontFamily: null,
      color: null,
      backgroundColor: null,
      bold: false,
      italic: false,
      underline: false,
      align: "left",
      headingLevel: null,
    });
  };

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  // Add CSS for image styling
  useEffect(() => {
    if (isMounted) {
      const styleId = "tiptap-custom-styles";
      let style = document.getElementById(styleId);

      if (!style) {
        style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
/* Link styling for nested content */
.ProseMirror a.text-blue-600 * {
  color: inherit !important;
  text-decoration: inherit !important;
}

.ProseMirror a.text-blue-600:hover * {
  text-decoration: underline !important;
}

/* Ensure links are properly colored */
.ProseMirror a {
  color: #2563eb !important;
  text-decoration: underline !important;
}

  

          /* Table styling */
          .ProseMirror table {
            border-collapse: collapse;
            width: 100%;
            margin: 1rem 0;
          }
          .ProseMirror table td,
          .ProseMirror table th {
            border: 1px solid #d1d5db;
            padding: 0.5rem 0.75rem;
            position: relative;
          }
          .ProseMirror table th {
            background-color: #f3f4f6;
            font-weight: 600;
          }
          .ProseMirror table td[style*="background-color"],
          .ProseMirror table th[style*="background-color"] {
            background-color: inherit !important;
          }
          
          /* Image styling - BLOCK MODE (NO TEXT WRAPPING) */
          .ProseMirror img {
            max-width: 100%;
            height: auto;
            transition: all 0.2s ease;
            cursor: move;
            position: relative;
            display: block !important;
          }
            /* Add this at the end of your CSS */
.ProseMirror br {
  display: block;
  content: "";
  margin-bottom: 0;
}

/* For very tight spacing */
.ProseMirror p {
  min-height: 0.1em;
}

/* Remove all default spacing */
.ProseMirror * {
  margin-block-start: 0;
  margin-block-end: 0;
}

/* Only add spacing for specific cases */
.ProseMirror > * + * {
  margin-top: 0.25em !important;
}
          
          .ProseMirror img:hover {
            outline: 2px solid #3b82f6;
          }
          
          .ProseMirror img.selected {
            outline: 2px solid #3b82f6;
          }
          
          /* Block alignment - NO text wrapping, takes full width */
          .ProseMirror img[data-align="block"] {
            display: block !important;
            margin: 1.5rem auto !important;
            clear: both !important;
            float: none !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          
          /* If you want centered but smaller */
          .ProseMirror img[data-align="block"][style*="width"] {
            margin-left: auto !important;
            margin-right: auto !important;
            display: block !important;
          }
          
          /* Inline alignment options (if needed) */
          .ProseMirror img[data-align="inline-left"] {
            float: left !important;
            margin-right: 1rem !important;
            margin-bottom: 1rem !important;
            clear: none !important;
            max-width: 50% !important;
          }
          
          .ProseMirror img[data-align="inline-right"] {
            float: right !important;
            margin-left: 1rem !important;
            margin-bottom: 1rem !important;
            clear: none !important;
            max-width: 50% !important;
          }
          
          /* Clear floats to prevent text wrapping */
          .ProseMirror p, .ProseMirror h1, .ProseMirror h2, .ProseMirror h3, 
          .ProseMirror h4, .ProseMirror h5, .ProseMirror h6 {
            clear: both !important;
          }
          
          /* Ensure text doesn't wrap around images */
          .ProseMirror > * {
            overflow: hidden !important;
          }
          
          /* Image upload placeholder */
          .image-uploading-placeholder {
            background: #f3f4f6;
            border: 2px dashed #d1d5db;
            border-radius: 0.5rem;
            padding: 2rem;
            text-align: center;
            color: #6b7280;
            font-style: italic;
            margin: 1rem 0;
          }
          
          /* Improved Resize handle styling */
          .editor-resize-handle {
            position: absolute;
            bottom: 2px;
            right: 2px;
            width: 16px;
            height: 16px;
            cursor: nwse-resize;
            background: linear-gradient(135deg, transparent 50%, #3b82f6 50%);
            border-radius: 2px;
            opacity: 0.7;
            transition: opacity 0.2s, transform 0.2s;
            z-index: 50;
            border: 1px solid white;
          }
          
          .editor-resize-handle:hover {
            opacity: 1;
            transform: scale(1.1);
          }
          
          .editor-resize-handle.resizing {
            opacity: 1;
            background: linear-gradient(135deg, transparent 50%, #1d4ed8 50%);
            box-shadow: 0 0 0 1px #1d4ed8;
          }
          
          /* Editor height display */
          .editor-height-display {
            background: rgba(59, 130, 246, 0.9);
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 500;
            backdrop-filter: blur(4px);
            border: 1px solid white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          
          /* Make sure the resize handle container is clickable */
          .relative > .absolute {
            pointer-events: auto;
          }
          
          /* Better list styling for pasted content */
          .ProseMirror ol {
            list-style-type: decimal;
            padding-left: 1.5em;
            margin: 0.25em 0;
          }
          
          .ProseMirror ol > li {
            position: relative;
            margin: 0.1em 0;
          }
          
          .ProseMirror ul {
            list-style-type: disc;
            padding-left: 1.5em;
            margin: 0.25em 0;
          }
          
          .ProseMirror ul > li {
            position: relative;
            margin: 0.1em 0;
          }
          
          /* Preserve line breaks in lists */
          .ProseMirror li p {
            margin: 0;
            display: inline;
          }
          
          /* Paste handling styles - Better line spacing */
          .ProseMirror {
            line-height: 1.3 !important;
          }
             .ProseMirror br {
          display: block !important;
          content: "" !important;
          margin: 0 !important;
          padding: 0 !important;
          height: 0 !important;
          line-height: 0 !important;
        }
        
        /* Single line break spacing */
        .ProseMirror br + br {
          display: none !important;
        }
        
        /* When there's a line break followed by text */
        .ProseMirror p:has(> br) {
          margin-bottom: 0.5em !important;
        }
        
        /* Your existing styles... */
        
        /* Table styling */
        .ProseMirror table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
        }
          
          .ProseMirror p {
            margin: 0 !important;
          padding: 0 !important;
          min-height: 0 !important;
          }
           .ProseMirror p + p {
          margin-top: 0 !important;
        }
          .ProseMirror h1, 
          .ProseMirror h2, 
          .ProseMirror h3, 
          .ProseMirror h4, 
          .ProseMirror h5, 
          .ProseMirror h6 {
            font-weight: bold;
            line-height: 1.15;
          }
          
          /* Heading border REMOVED - এখানে border-bottom লাইনগুলো remove করা হয়েছে */
          .ProseMirror h1 { 
            font-size: 2em; 
            padding-bottom: 0.3em;
          }
          .ProseMirror h2 { 
            font-size: 1.5em; 
            padding-bottom: 0.3em;
          }
          .ProseMirror h3 { font-size: 1.25em; }
          .ProseMirror h4 { font-size: 1.1em; }
          .ProseMirror h5 { font-size: 1em; }
          .ProseMirror h6 { font-size: 0.9em; color: #6b7280; }
          
          .ProseMirror blockquote {
            border-left: 4px solid #d1d5db;
            margin: 1em 0;
            padding-left: 1em;
            font-style: italic;
            color: #4b5563;
          }
          
          .ProseMirror code {
            background: #f3f4f6;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
          }
          
          .ProseMirror pre {
            background: #1f2937;
            color: #f3f4f6;
            padding: 1em;
            border-radius: 6px;
            overflow-x: auto;
            font-family: 'Courier New', monospace;
            margin: 1em 0;
          }
          
          /* Keep formatting from Word/Docs */
          .ProseMirror strong, .ProseMirror b {
            font-weight: 700;
          }
          
          .ProseMirror em, .ProseMirror i {
            font-style: italic;
          }
          
          .ProseMirror u {
            text-decoration: underline;
          }
          
          /* Preserve text alignment */
          .ProseMirror p[style*="text-align: center"] {
            text-align: center;
          }
          
          .ProseMirror p[style*="text-align: right"] {
            text-align: right;
          }
          
          .ProseMirror p[style*="text-align: justify"] {
            text-align: justify;
          }
          
          /* Better spacing for pasted content */
          .ProseMirror > *:first-child {
            margin-top: 0;
          }
          
          .ProseMirror > *:last-child {
            margin-bottom: 0;
          }
          
          /* Selection styling */
          .ProseMirror .selected {
            background-color: rgba(59, 130, 246, 0.1);
          }
          
          /* Custom text styles */
          .ProseMirror span[style*="font-size"] {
            display: inline;
          }
          
          .ProseMirror span[style*="background-color"] {
            display: inline;
            padding: 0 0.1em;
            border-radius: 0.2em;
          }
          
          .ProseMirror span[style*="color"] {
            display: inline;
          }
          
          .ProseMirror span[style*="font-family"] {
            display: inline;
          }
          
          /* Keyboard shortcut hints */
          .toolbar-button {
            position: relative;
          }
          
          .toolbar-button:hover::after {
            content: attr(data-shortcut);
            position: absolute;
            bottom: -25px;
            left: 50%;
            transform: translateX(-50%);
            background: #1f2937;
            color: white;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 11px;
            white-space: nowrap;
            z-index: 1000;
          }
          
          /* Text property indicators */
          .text-property-indicator {
            background: #f3f4f6;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            padding: 2px 6px;
            font-size: 12px;
            color: #4b5563;
            display: flex;
            align-items: center;
            gap: 4px;
          }
          
          .property-active {
            background: #3b82f6 !important;
            color: white !important;
            border-color: #2563eb !important;
          }
          
          /* Clear formatting button */
          .clear-format-btn {
            background: #ef4444;
            color: white;
            border-radius: 4px;
            padding: 2px 8px;
            font-size: 11px;
            font-weight: 500;
            border: none;
            cursor: pointer;
          }
          
          .clear-format-btn:hover {
            background: #dc2626;
          }

          /* Responsive Table Styles */
.table-responsive-wrapper {
  width: 100% !important;
  overflow-x: auto !important;
  margin: 1rem 0 !important;
  -webkit-overflow-scrolling: touch !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 0.375rem !important;
}

.responsive-table {
  min-width: 600px !important; /* Minimum width for scrolling on mobile */
  width: 100% !important;
  margin: 0 !important;
}

/* Responsive table cells */
.responsive-table td,
.responsive-table th {
  min-width: 100px !important;
  max-width: 300px !important;
  word-wrap: break-word !important;
  overflow-wrap: break-word !important;
  white-space: normal !important;
  padding: 0.75rem !important;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .responsive-table {
    min-width: 500px !important;
  }
  
  .responsive-table td,
  .responsive-table th {
    padding: 0.5rem !important;
    font-size: 0.875rem !important;
    min-width: 80px !important;
  }
  
  .table-responsive-wrapper {
    margin-left: -0.5rem !important;
    margin-right: -0.5rem !important;
    border-radius: 0 !important;
    border-left: none !important;
    border-right: none !important;
  }
}

@media (max-width: 640px) {
  .responsive-table {
    min-width: 400px !important;
  }
  
  .responsive-table td,
  .responsive-table th {
    padding: 0.375rem !important;
    font-size: 0.8125rem !important;
    min-width: 60px !important;
  }
}

/* Hide table scrollbar on desktop when not needed */
.table-responsive-wrapper::-webkit-scrollbar {
  height: 8px;
}

.table-responsive-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.table-responsive-wrapper::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.table-responsive-wrapper::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Ensure text breaks properly in tables */
.ProseMirror td,
.ProseMirror th {
  word-break: break-word !important;
  overflow-wrap: break-word !important;
  white-space: normal !important;
}
        `;
        document.head.appendChild(style);
      }

      return () => {
        const existingStyle = document.getElementById(styleId);
        if (existingStyle && document.head.contains(existingStyle)) {
          document.head.removeChild(existingStyle);
        }
      };
    }
  }, [isMounted]);

  if (!isMounted) {
    return (
      <div
        className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm"
        style={{ height: defaultHeight }}
      >
        <div className="h-12 bg-gray-50 border-b border-gray-300"></div>
        <div className="px-6 py-5 prose prose-lg h-[calc(100%-3rem)] overflow-auto">
          <p className="text-gray-400">Loading editor...</p>
        </div>
      </div>
    );
  }

  if (!editor) {
    return (
      <div
        className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm"
        style={{ height: defaultHeight }}
      >
        <div className="h-12 bg-gray-50 border-b border-gray-300"></div>
        <div className="px-6 py-5 prose prose-lg h-[calc(100%-3rem)] overflow-auto">
          <p className="text-gray-500">Initializing editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm relative"
      style={{}}
    >
      <EditorContent editor={editor} className="h-full overflow-auto" />
    </div>
  );
}
