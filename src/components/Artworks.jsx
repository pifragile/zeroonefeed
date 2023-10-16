import { useEffect, useState } from "react";

function Artworks() {
    const [numArtworks, setNumArtworks] = useState({});

    useEffect(() => {
        async function action() {
            let count = {};
            let d = new Date();
            d.setDate(d.getDate() + 1);
            for (let i = 0; i < 16; i++) {
                d.setDate(d.getDate() - 1);
                let start = new Date(d);
                let end = new Date(d);
                start.setUTCHours(0, 0, 0, 0);
                end.setUTCHours(23, 59, 59, 999);
                const query = `https://api.zeroone.art/api/artworks?filters[createdAt][$gte]=${start.toISOString()}&filters[createdAt][$lt]=${end.toISOString()}&pagination[pageSize]=250`;
                let res = await fetch(query);
                let result = await res.json();
                let total = result.meta.pagination.total;
                let dateString = start.toISOString().split("T")[0];
                count[dateString] = total;
            }
            setNumArtworks(count);
        }

        action().catch(console.error);
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <h3>artworks per day</h3>
                </tr>
                <tr>
                    <th>day</th>
                    <th>artworks published</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(numArtworks).map(([date, num]) => (
                    <tr>
                        <td>{date}</td>
                        <td>{num}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Artworks;
