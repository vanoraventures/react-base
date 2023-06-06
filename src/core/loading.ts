import shallow from "zustand/shallow";
import { useNoyirmibirStore } from "../components/main";

/**
 * Returns two functions [decreaseLoading, increaseLoading]
 */
function useLoading(): [() => void, () => void] {
    return useNoyirmibirStore(state => [state.decreaseLoading, state.increaseLoading], shallow);
}

export default useLoading;