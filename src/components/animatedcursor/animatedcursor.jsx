import './animatedcursor.css';
import { useSelector} from 'react-redux';

export default function AnimatedCursor()
{
    const click = useSelector(state => state.click);
    return <>
    <div style={{
        position: "absolute",
        top: click.y-20,
        left: click.x-20,
        pointerEvents: "none",
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}>
        <div className='animated-cursor'></div>
    </div>
    </>
}