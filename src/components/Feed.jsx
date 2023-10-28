import { useEffect, useState } from "react";
import Item from "./Item";

function Feed({ soldout = false, shuffle = false }) {
    const pageLength = 50;
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function action() {
            let result;

            if (shuffle) {
                let res = await fetch(
                    `https://api.zeroone.art/api/feed/shuffle/1/20/-1`
                );
                result = (await res.json()).items;
                result.forEach(e => {
                    console.log(e)
                    e.MediaInfo = JSON.parse(e.media_info)
                    e.Title = e.title
                    e.Slug = e.slug
                })
            } else {
                let res = await fetch(
                    `https://api.zeroone.art/api/feed/recent/${page}/${pageLength}`
                );
                result = await res.json();
                if (soldout) {
                    result = result.filter(
                        (e) =>
                            parseInt(e.Editions) - e.CreatorEditions - e.minted <= 0
                    );
                } else {
                    result = result.filter(
                        (e) =>
                            parseInt(e.Editions) - e.CreatorEditions - e.minted > 0
                    );
                }
            }
            setData((current) => [...current, ...result]);
        }

        action().catch(console.error);
    }, [page]);

    const handleScroll = (e) => {
        const bottom =
            Math.ceil(window.innerHeight + window.scrollY) >=
            document.documentElement.scrollHeight;
        if (bottom) {
            setPage((current) => current + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
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

export default Feed;
