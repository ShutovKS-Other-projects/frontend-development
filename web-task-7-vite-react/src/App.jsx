import ColorList from './components/ColorList';
import './App.css'

function App() {
    const baseColors = ['#FF5733', '#1E90FF', '#32CD32', '#FFD700'];

    return (
        <main style={{padding: 32}}>
            <h1>Цветовые блоки</h1>
            <ColorList initial={baseColors}/>
        </main>
    );
}


export default App
