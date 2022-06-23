import React, { ReactElement, useEffect } from "react";
import create from "zustand";
import "./global.scss";

type MainProps = {
    children: ReactElement,
    loadingWrapper?: ReactElement
}

type NoyirmibirStore = {
    loading: {
        count: number
    },
    scroll: {
        lastScrollPosition: number,
        lockedScrollCount: number
    },
    size: {
        width?: number,
        height?: number,
        isMobile: boolean
    },
    setLoading: (loading: { count: number }) => void,
    setScroll: (scroll: { lastScrollPosition: number, lockedScrollCount: number }) => void,
    setSize: (loading: { width?: number, height?: number, isMobile: boolean }) => void
}

export const useNoyirmibirStore = create<NoyirmibirStore>(set => ({
    loading: {
        count: 0
    },
    scroll: {
        lastScrollPosition: 0,
        lockedScrollCount: 0
    },
    size: {
        width: undefined,
        height: undefined,
        isMobile: false
    },
    setLoading: (loading: { count: number }) => set({ loading }),
    setScroll: (scroll: { lastScrollPosition: number, lockedScrollCount: number }) => set({ scroll }),
    setSize: (size: { width?: number, height?: number, isMobile: boolean }) => set({ size })
}));

/**
 * Main wrapper for Noyirmibir React Library
 */
const Noyirmibir = (props: MainProps) => {
    const setSize = useNoyirmibirStore(state => state.setSize);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        function handleResize() {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setSize({
                    width: document.documentElement.clientWidth,
                    height: window.innerHeight,
                    isMobile: document.documentElement.clientWidth <= 900
                });
            }, 350);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return <>
        {props.children}
        <Loading wrapper={props.loadingWrapper} />
    </>;
};

const Loading = (props: { wrapper?: ReactElement }) => {
    const count = useNoyirmibirStore(state => state.loading.count);

    if (count > 0) {
        if (props.wrapper) {
            return props.wrapper
        }

        return <div className="loading">
            <svg className="load" x="0px" y="0px" viewBox="0 0 150 150">
                <circle className="loading-inner" cx="75" cy="75" r="60"></circle>
            </svg>
        </div>
    }

    return <></>;
}

export default Noyirmibir;