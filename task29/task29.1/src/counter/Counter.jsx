import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, selectCount } from "./counterSlice.jsx";

export default function Counter() {
    const value = useSelector(selectCount);
    const dispatch = useDispatch();

    return (
        <div className="counter">
            <button onClick={() => dispatch(decrement())} aria-label="Decrease">
                −
            </button>
            <span className="value">{value}</span>
            <button onClick={() => dispatch(increment())} aria-label="Increase">
                +
            </button>
        </div>
    );
}
