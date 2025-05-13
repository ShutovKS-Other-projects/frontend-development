/** один цвет */
export default function ColorBox({hex}) {
    const style = {
        width: 120,
        height: 120,
        backgroundColor: hex,
        borderRadius: 8,
        border: '1px solid #ccc',
    };

    return (
        <div style={{textAlign: 'center', margin: 12}}>
            <div style={style}/>
            <code>{hex}</code>
        </div>
    );
}
