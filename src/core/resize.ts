import { useContext } from "react";
import { NoyirmibirContext } from "../components/main";

/**
 * Returns an object { width: number | undefined; height: number | undefined; isMobile: boolean; }
 */
function useWindowSize() {
    return useContext(NoyirmibirContext).mainState.size;
}

export default useWindowSize;