import { useEffect, useState } from "react";
import "./App.css";
import Item from "./Item";

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        function action() {
          console.log('calling api')
            fetch(`https://api.zeroone.art/api/feed/recent/1/4`)
                .then((result) => result.json())
                .then((result) => setData(result));
        }
        action();
        const interval = setInterval(() => action(), 10000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    if (data.length > 0) {
        return (
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                }}
            >
                {data.map((e) => (
                    <Item
                        imgUrl={e.MediaInfo.url}
                        url={`https://zeroone.art/artwork/${e.Slug}`}
                        title={e.Title}
                        type={e.MediaInfo.type}
                    />
                ))}
            </div>
        );
    }
}

export default App;
