import { useNoyirmibirStore } from "../components/main";
import shallow from 'zustand/shallow'

/**
 * Returns two functions [lockScroll, unlockScroll]
 */
function useLockScroll(): [Function, Function] {
    const [scroll, setScroll] = useNoyirmibirStore(state => [state.scroll, state.setScroll], shallow)

    const lockScroll = () => {
        const count = scroll.lockedScrollCount;
        scroll.lockedScrollCount = count + 1;

        if (count === 0) {
            scroll.lastScrollPosition = document.documentElement.scrollTop;

            document.body.style.marginTop = document.documentElement.scrollTop * (-1) + "px";
            document.body.style.paddingRight = (window.innerWidth - document.documentElement.clientWidth) + "px";
            document.documentElement.classList.add("lock");
        }

        setScroll({...scroll})
    }

    const unlockScroll = () => {
        const count = scroll.lockedScrollCount;
        scroll.lockedScrollCount = count - 1;

        if (count === 1) {
            document.documentElement.classList.remove("lock");
            document.body.style.paddingRight = "";
            document.body.style.marginTop = "";
            window.scrollTo(0, scroll.lastScrollPosition);
        }

        setScroll({...scroll})
    }

    return [lockScroll, unlockScroll];
}

export default useLockScroll;