import { useState, useEffect, useRef } from "react";
import EmojiButton from "./components/EmojiButton.jsx";
import Result from "./components/Result.jsx";

const emojis = ["😃", "😊", "😎", "🤩", "😍"];

export default function App() {
    const [votes, setVotes] = useState(() => {
        const saved = localStorage.getItem("emojiVotes");
        return saved ? JSON.parse(saved) : Array(emojis.length).fill(0);
    });

    const [winnerIndex, setWinnerIndex] = useState(null);
    const clearButtonRef = useRef(null);

    useEffect(() => {
        localStorage.setItem("emojiVotes", JSON.stringify(votes));
    }, [votes]);

    const handleVote = (index) => {
        const updated = [...votes];
        updated[index]++;
        setVotes(updated);
    };

    const showWinner = () => {
        const max = Math.max(...votes);
        const index = votes.indexOf(max);
        setWinnerIndex(max > 0 ? index : null);
        clearButtonRef.current?.focus();
    };

    const clearVotes = () => {
        setVotes(Array(emojis.length).fill(0));
        setWinnerIndex(null);
        localStorage.removeItem("emojiVotes");
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Vote for the best emoji</h1>

            <div>
                {emojis.map((emoji, i) => (
                    <EmojiButton key={i} emoji={emoji} count={votes[i]} onClick={() => handleVote(i)} />
                ))}
            </div>

            <button onClick={showWinner}>Show the results</button>
            <button ref={clearButtonRef} onClick={clearVotes} style={{ marginLeft: 10 }}>
                Clear
            </button>

            <Result emoji={emojis[winnerIndex]} votes={votes[winnerIndex]} />
        </div>
    );
}
