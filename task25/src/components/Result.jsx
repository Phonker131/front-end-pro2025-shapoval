import React from "react";

export default function Result({ emoji, votes }) {
    if (!emoji) return <p>Nobody voted yet</p>;
    return (
        <h2>
            Winner: {emoji} ({votes})
        </h2>
    );
}
