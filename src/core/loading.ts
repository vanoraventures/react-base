import { useContext } from "react";
import { NoyirmibirContext } from "../components/main";

/**
 * Returns two functions [showLoading, hideLoading]
 */
function useLoading(): [Function, Function] {
    const context = useContext(NoyirmibirContext);

    const showLoading = () => {
        context.mainState.loading.count += 1;
        context.setMainState({...context.mainState});
    }

    const hideLoading = () => {
        context.mainState.loading.count -= 1;
        context.setMainState({...context.mainState});
    }

    return [showLoading, hideLoading];
}

export default useLoading;