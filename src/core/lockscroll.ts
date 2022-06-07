import { useContext } from "react";
import { NoyirmibirContext } from "../components/main";

/**
 * Returns two functions [lockScroll, unlockScroll]
 */
function useLockScroll(): [Function, Function] {
    const context = useContext(NoyirmibirContext);

    const lockScroll = () => {
        const count = context.mainState.scroll.lockedScrollCount;
        context.mainState.scroll.lockedScrollCount = count + 1;

        if (count === 0) {
            context.mainState.scroll.lastScrollPosition = document.documentElement.scrollTop;

            document.body.style.marginTop = document.documentElement.scrollTop * (-1) + "px";
            document.body.style.paddingRight = (window.innerWidth - document.documentElement.clientWidth) + "px";
            document.documentElement.classList.add("lock");
        }

        context.setMainState({...context.mainState});
    }

    const unlockScroll = () => {
        const count = context.mainState.scroll.lockedScrollCount;
        context.mainState.scroll.lockedScrollCount = count - 1;

        if (count === 1) {
            document.documentElement.classList.remove("lock");
            document.body.style.paddingRight = "";
            document.body.style.marginTop = "";
            window.scrollTo(0, context.mainState.scroll.lastScrollPosition);
        }

        context.setMainState({...context.mainState});
    }

    return [lockScroll, unlockScroll];
}

export default useLockScroll;