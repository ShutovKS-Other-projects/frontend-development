import {useState} from 'react';
import ColorBox from './ColorBox';

/** массив цветов */
export default function ColorList({initial}) {
    const [colors, setColors] = useState(initial);

    const duplicate = () => setColors([...colors, ...colors]);

    return (
        <>
            <button onClick={duplicate} style={{marginBottom: 16}}>
                Дублировать
            </button>

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 16,
                }}
            >
                {colors.map((hex, i) => (
                    <ColorBox key={`${hex}-${i}`} hex={hex}/>
                ))}
            </div>
        </>
    );
}
