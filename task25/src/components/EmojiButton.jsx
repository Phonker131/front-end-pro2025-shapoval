import React from "react";

export default function EmojiButton({ emoji, count, onClick }) {
    return (
        <button onClick={onClick} style={{ fontSize: 30, margin: 5 }}>
            {emoji} ({count})
        </button>
    );
}
