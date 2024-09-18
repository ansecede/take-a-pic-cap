import placeholderLogo from "src/assets/your-brand-here.webp";
import "./title.css";

function Title({ title }: { title: string }) {
    return (
        <>
            <div className="title-text">
                <h1>{title}</h1>
            </div>
            <div className="sponsors">
                <div className="sponsors-placeholder">
                    <h3 className="sponsors-text">Sponsors: </h3>
                    <img
                        src={placeholderLogo}
                        alt="Your brand here placeholder"
                        className="brand-logo"
                    />
                </div>
            </div>
        </>
    );
}

export default Title;
