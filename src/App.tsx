// src/App.tsx
import "./App.css"; // 保留或修改全局样式
import TiptapEditor from "./components/TiptapEditor";

function App() {
	return (
		<div className='App'>
			<h1>Tiptap + Vite 富文本编辑器示例</h1>
			<TiptapEditor />
			{/* 你可以在这里添加获取编辑器内容、保存等逻辑 */}
			{/* 例如:
      const [content, setContent] = useState('');
      // ... 在 TiptapEditor 组件中添加 onUpdate 回调来设置 content
      // <TiptapEditor onUpdate={({ editor }) => setContent(editor.getHTML())} />
      // <button onClick={() => console.log(content)}>获取 HTML</button>
      */}
		</div>
	);
}

export default App;
