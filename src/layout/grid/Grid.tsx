import "./grid.css";

const uiElements = [
    "title",
    "camera",
    "leftContiner",
    "rightContainer",
    "buttons",
] as const;
type uiEl = (typeof uiElements)[number];
type Props = {
    [key in uiEl]: JSX.Element;
};

function Grid({ title, leftContiner, rightContainer }: Props) {
    return (
        <>
            <div id="grid-container">
                <div className="title">{title}</div>
                {/* <div className="camera">{camera}</div> */}
                <div className="left-container">{leftContiner}</div>
                <div className="right-container">{rightContainer}</div>
                {/* <div className="action-buttons"> */}
                {/* {buttons} */}
                {/* <button>Pay ➡️</button> */}
                {/* </div> */}
            </div>
        </>
    );
}

export default Grid;
