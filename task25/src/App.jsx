import React from "react";
import EmojiButton from "./components/EmojiButton.jsx";
import Result from "./components/Result.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const emojis = ["😃", "😊", "😎", "🤩", "😍"];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            votes: Array(emojis.length).fill(0),
            winnerIndex: null,
        };
        console.log("initialization");
    }

    componentDidMount() {
        console.log("Mounting component");
        const savedVotes = localStorage.getItem("emojiVotes");
        if (savedVotes) {
            this.setState({ votes: JSON.parse(savedVotes) });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.votes !== this.state.votes) {
            console.log("Updating component");
            localStorage.setItem("emojiVotes", JSON.stringify(this.state.votes));
        }
    }

    componentWillUnmount() {
        console.log("Unmounting component");
    }

    vote = (index) => {
        const updatedVotes = [...this.state.votes];
        updatedVotes[index]++;
        this.setState({ votes: updatedVotes });
    };

    showWinner = () => {
        const max = Math.max(...this.state.votes);
        const index = this.state.votes.indexOf(max);
        this.setState({ winnerIndex: max > 0 ? index : null });
    };

    clear = () => {
        this.setState({
            votes: Array(emojis.length).fill(0),
            winnerIndex: null,
        });
        localStorage.removeItem("emojiVotes");
    };

    render() {
        const { votes, winnerIndex } = this.state;

        return (
            <div style={{ textAlign: "center" }}>
                <h1>Vote for the best emoji</h1>

                <div>
                    {emojis.map((emoji, i) => (
                        <EmojiButton key={i} emoji={emoji} count={votes[i]} onClick={() => this.vote(i)} />
                    ))}
                </div>

                <button onClick={this.showWinner}>Show results</button>
                <button onClick={this.clear} style={{ marginLeft: 10 }}>
                    Clear
                </button>

                <Result emoji={emojis[winnerIndex]} votes={votes[winnerIndex]} />
            </div>
        );
    }
}

export default function WrappedApp() {
    return (
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    );
}
