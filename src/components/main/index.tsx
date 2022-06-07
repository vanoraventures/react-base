import React, { ReactElement, useEffect, useState } from "react";
import "./global.scss";

type MainProps = {
    children: ReactElement,
    loadingWrapper?: ReactElement
}

type NoyirmibirContextType = {
    mainState: MainState,
    setMainState: React.Dispatch<React.SetStateAction<MainState>>
}

const defaultState: MainState = {
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
    }
}

export type MainState = {
    loading: {
        count: number
    },
    scroll: {
        lastScrollPosition: number,
        lockedScrollCount: number
    },
    size: {
        width: number | undefined;
        height: number | undefined;
        isMobile: boolean;
    }
}

export const NoyirmibirContext = React.createContext<NoyirmibirContextType | null>(null) as React.Context<NoyirmibirContextType>;

/**
 * Main wrapper for Noyirmibir React Library
 */
const Noyirmibir = (props: MainProps) => {
    const [mainState, setMainState] = useState<MainState>(defaultState);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        
        function handleResize() {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                mainState.size = {
                    width: document.documentElement.clientWidth,
                    height: window.innerHeight,
                    isMobile: document.documentElement.clientWidth <= 900
                };

                setMainState({...mainState});
            }, 250);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <NoyirmibirContext.Provider value={{ mainState, setMainState }}>
            <>
                {props.children}
                {mainState.loading.count > 0 &&
                    <Loading wrapper={props.loadingWrapper} />
                }
            </>
        </NoyirmibirContext.Provider>
    );
};

type LoadingType = {
    wrapper?: ReactElement
}

const Loading = (props: LoadingType) => {
    let wrapper = props.wrapper;

    if (!wrapper) {
        wrapper = (<div className="loading">
            <svg className="load" x="0px" y="0px" viewBox="0 0 150 150">
                <circle className="loading-inner" cx="75" cy="75" r="60"></circle>
            </svg>
        </div>);
    }

    return wrapper;
}

export default Noyirmibir;