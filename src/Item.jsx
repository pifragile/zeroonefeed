import "./App.css";

function Item({ imgUrl, url, type, title }) {
    return (
        <div style={{ margin: "1vw" }}>
            <a href={url}>
                {type === "image" && <img src={imgUrl} />}
                {type === "video" && (
                    <video width="320" height="240" autoPlay loop muted>
                        <source src={imgUrl} />
                        Your browser does not support the video tag.
                    </video>
                )}
            </a>
        </div>
    );
}

export default Item;
