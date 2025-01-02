import "./Flashcard.css"
import { useState } from "react";
function Flashcard({ front, back }) {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    return (
        <div className={`card ${flipped ? 'flip' : ''}`} onClick={handleFlip}>
            <div className="front">{front}</div>
            <div className="back">{back}</div>
        </div>
    );
}

export default Flashcard