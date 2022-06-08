import { useNoyirmibirStore } from "../components/main";

/**
 * Returns an object { width: number | undefined; height: number | undefined; isMobile: boolean; }
 */
function useWindowSize() {
    return useNoyirmibirStore(state => state.size);
}

export default useWindowSize;