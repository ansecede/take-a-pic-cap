import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import "./tabs.css";

interface Props {
    webcamSrc: React.ReactNode;
    liveStreamSrc: React.ReactNode;
    nonLiveVideoSrc: React.ReactNode;
}

function ImageSourceTabs({ webcamSrc, liveStreamSrc, nonLiveVideoSrc }: Props) {
    return (
        <>
            <Tabs.Root className="tabs-root" defaultValue="empty">
                <Tabs.List
                    className="tabs-list"
                    aria-label="Select a camera source"
                >
                    <Tabs.Trigger className="tabs-trigger" value="webcam">
                        Cámara Local
                    </Tabs.Trigger>
                    <Tabs.Trigger className="tabs-trigger" value="server">
                        Transamision en vivo
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        className="tabs-trigger"
                        value="non-live-videos"
                    >
                        Videos
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content className="tabs-content" value="empty">
                    <h1>⬆️ Escoja una fuente</h1>
                </Tabs.Content>
                <Tabs.Content className="tabs-content" value="webcam">
                    {webcamSrc}
                </Tabs.Content>
                <Tabs.Content className="tabs-content" value="server">
                    {liveStreamSrc}
                </Tabs.Content>
                <Tabs.Content className="tabs-content" value="non-live-videos">
                    {nonLiveVideoSrc}
                </Tabs.Content>
            </Tabs.Root>
        </>
    );
}

export default ImageSourceTabs;
