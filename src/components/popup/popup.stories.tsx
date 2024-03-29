import React from "react";
import { Story } from "@storybook/react";
import Noyirmibir from "../main";
import Popup, { PopupProps, usePopup } from ".";
import useWindowSize from "../../core/resize";

export default {
    title: "noyirmibir-react/popup",
    component: Popup,
};

const Template: Story<PopupProps> = (args: PopupProps) => {
    const popup = usePopup();

    return <Noyirmibir>
        <>
            <button onClick={() => popup.open()}>Open</button>
            <Popup popup={popup} onOpen={() => { console.log("opened") }} onClose={() => { console.log("closed") }}>
                <div className="popup-container">
                    <div className="content">
                        Test
                    </div>
                    <div className="popup-close" onClick={() => popup.close()}></div>
                </div>
            </Popup>
        </>
    </Noyirmibir>
};

export const Sample = Template.bind({});
Sample.args = {
    classNames: ""
};