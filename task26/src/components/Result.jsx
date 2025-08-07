export default function Result({ emoji, votes }) {
    if (emoji === null) {
        return <p>Nobody voted yet</p>;
    }

    return (
        <h2>
            Winner: {emoji} ({votes})
        </h2>
    );
}
