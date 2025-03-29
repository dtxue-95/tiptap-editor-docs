// src/components/TiptapEditor.tsx
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link"; // 引入 Link 扩展
import Toolbar from "./Toolbar"; // 引入新的 Toolbar 组件
import "./TiptapEditor.css"; // 主编辑器样式

const TiptapEditor: React.FC = () => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				// 你可以禁用 StarterKit 中不需要的功能
				// heading: { levels: [1, 2, 3] }, // 限制标题级别
				// codeBlock: false, // 如果不需要代码块
			}),
			Underline, // 添加下划线扩展
			Placeholder.configure({
				placeholder: "请输入内容...", // 设置占位符文本
			}),
			Link.configure({
				// 配置 Link 扩展
				openOnClick: false, // 点击时不自动打开链接
				autolink: true, // 自动识别 URL 为链接
			}),
			// 在这里添加更多扩展...
			// Image, Table, etc.
		],
		content: "",
		editorProps: {
			attributes: {
				// WangEditor 通常有一个明确的边框和内边距
				class: "tiptap-editor-content wang-editor-style",
			},
		},
	});

	return (
		<div className='tiptap-wrapper'>
			{/* 渲染独立的工具栏 */}
			<Toolbar editor={editor} />

			{/* 编辑器内容区域 */}
			<EditorContent editor={editor} />
		</div>
	);
};

export default TiptapEditor;
