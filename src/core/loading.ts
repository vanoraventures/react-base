import shallow from "zustand/shallow";
import { useNoyirmibirStore } from "../components/main";

/**
 * Returns two functions [showLoading, hideLoading]
 */
function useLoading(): [Function, Function] {
    const [loading, setLoading] = useNoyirmibirStore(state => [state.loading, state.setLoading], shallow)

    const showLoading = () => {
        loading.count += 1;
        setLoading({...loading});
    }

    const hideLoading = () => {
        loading.count -= 1;
        setLoading({...loading});
    }

    return [showLoading, hideLoading];
}

export default useLoading;