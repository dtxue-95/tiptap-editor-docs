// src/components/Toolbar.tsx
import React from "react";
import { type Editor } from "@tiptap/react";
import {
	FaBold,
	FaItalic,
	FaStrikethrough,
	FaUnderline,
	FaListUl,
	FaListOl,
	FaQuoteLeft,
	FaCode,
	FaUndo,
	FaRedo,
	FaParagraph,
	FaHeading,
	FaImage,
	FaLink, // 示例图标，后续可实现功能
} from "react-icons/fa"; // 从 Font Awesome 导入图标
import "./Toolbar.css";

interface ToolbarProps {
	editor: Editor | null;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
	if (!editor) {
		return null;
	}

	// --- Helper Functions ---
	const toggleHeading = (level: 1 | 2 | 3) => {
		editor.chain().focus().toggleHeading({ level }).run();
	};

	// 可以添加设置链接的函数
	const setLink = () => {
		const previousUrl = editor.getAttributes("link").href;
		const url = window.prompt("URL", previousUrl);

		// cancelled
		if (url === null) {
			return;
		}

		// empty
		if (url === "") {
			editor.chain().focus().extendMarkRange("link").unsetLink().run();
			return;
		}

		// update link
		editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
	};

	// --- Button Definitions ---
	// 将按钮定义为对象数组，方便管理和渲染
	const buttons = [
		{
			id: "bold",
			action: () => editor.chain().focus().toggleBold().run(),
			icon: <FaBold />,
			title: "加粗",
			checkActive: () => editor.isActive("bold"),
		},
		{
			id: "italic",
			action: () => editor.chain().focus().toggleItalic().run(),
			icon: <FaItalic />,
			title: "斜体",
			checkActive: () => editor.isActive("italic"),
		},
		{
			id: "underline",
			action: () => editor.chain().focus().toggleUnderline().run(),
			icon: <FaUnderline />,
			title: "下划线",
			checkActive: () => editor.isActive("underline"),
		},
		{
			id: "strike",
			action: () => editor.chain().focus().toggleStrike().run(),
			icon: <FaStrikethrough />,
			title: "删除线",
			checkActive: () => editor.isActive("strike"),
		},
		// --- 分隔符 ---
		{ id: "divider-1", type: "divider" },
		{
			id: "h1",
			action: () => toggleHeading(1),
			icon: (
				<>
					<FaHeading />1
				</>
			),
			title: "标题 1",
			checkActive: () => editor.isActive("heading", { level: 1 }),
		},
		{
			id: "h2",
			action: () => toggleHeading(2),
			icon: (
				<>
					<FaHeading />2
				</>
			),
			title: "标题 2",
			checkActive: () => editor.isActive("heading", { level: 2 }),
		},
		{
			id: "h3",
			action: () => toggleHeading(3),
			icon: (
				<>
					<FaHeading />3
				</>
			),
			title: "标题 3",
			checkActive: () => editor.isActive("heading", { level: 3 }),
		},
		{
			id: "paragraph",
			action: () => editor.chain().focus().setParagraph().run(),
			icon: <FaParagraph />,
			title: "段落",
			checkActive: () => editor.isActive("paragraph"),
		},
		// --- 分隔符 ---
		{ id: "divider-2", type: "divider" },
		{
			id: "bulletList",
			action: () => editor.chain().focus().toggleBulletList().run(),
			icon: <FaListUl />,
			title: "无序列表",
			checkActive: () => editor.isActive("bulletList"),
		},
		{
			id: "orderedList",
			action: () => editor.chain().focus().toggleOrderedList().run(),
			icon: <FaListOl />,
			title: "有序列表",
			checkActive: () => editor.isActive("orderedList"),
		},
		{
			id: "blockquote",
			action: () => editor.chain().focus().toggleBlockquote().run(),
			icon: <FaQuoteLeft />,
			title: "引用",
			checkActive: () => editor.isActive("blockquote"),
		},
		{
			id: "codeBlock",
			action: () => editor.chain().focus().toggleCodeBlock().run(),
			icon: <FaCode />,
			title: "代码块",
			checkActive: () => editor.isActive("codeBlock"),
		},
		// --- 分隔符 ---
		{ id: "divider-3", type: "divider" },
		{
			id: "link",
			action: setLink,
			icon: <FaLink />,
			title: "链接",
			checkActive: () => editor.isActive("link"),
		},
		{ id: "image", action: () => {}, icon: <FaImage />, title: "图片" }, // 图片功能需要更复杂处理
		// --- 分隔符 ---
		{ id: "divider-4", type: "divider" },
		{
			id: "undo",
			action: () => editor.chain().focus().undo().run(),
			icon: <FaUndo />,
			title: "撤销",
			disabled: !editor.can().undo(),
		},
		{
			id: "redo",
			action: () => editor.chain().focus().redo().run(),
			icon: <FaRedo />,
			title: "重做",
			disabled: !editor.can().redo(),
		},
	];

	return (
		<div className='editor-toolbar'>
			{buttons.map((button) => {
				if (button.type === "divider") {
					return <div key={button.id} className='toolbar-divider' />;
				}
				return (
					<button
						key={button.id}
						onClick={button.action}
						className={`toolbar-button ${
							button.checkActive && button.checkActive() ? "is-active" : ""
						}`}
						title={button.title}
						disabled={button.disabled} // 处理撤销/重做按钮的禁用状态
					>
						{button.icon}
					</button>
				);
			})}
			{/* 未来可以添加下拉菜单，如字体大小、颜色等 */}
		</div>
	);
};

export default Toolbar;
