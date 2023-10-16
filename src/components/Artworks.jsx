import { useEffect, useState } from "react";

function Artworks() {
    const [numArtworks, setNumArtworks] = useState({});

    async function resolveObject(obj) {
        return Object.fromEntries(
            await Promise.all(
                Object.entries(obj).map(async ([k, v]) => [k, await v])
            )
        );
    }

    useEffect(() => {
        async function getCount(start, end) {
            const query = `https://api.zeroone.art/api/artworks?filters[createdAt][$gte]=${start.toISOString()}&filters[createdAt][$lt]=${end.toISOString()}&pagination[pageSize]=250`;
            let res = await fetch(query);
            let result = await res.json();
            let total = result.meta.pagination.total;
            return total;
        }
        async function action() {
            let counts = {};
            for (let i = 0; i < 16; i++) {
                let d = new Date();
                d.setDate(d.getDate() - i);
                let start = new Date(d);
                let end = new Date(d);
                start.setUTCHours(0, 0, 0, 0);
                end.setUTCHours(23, 59, 59, 999);
                counts[start.toISOString().split("T")[0]] = getCount(
                    start,
                    end
                );
            }
            setNumArtworks(await resolveObject(counts));
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
                    <tr key={date}>
                        <td>{date}</td>
                        <td>{num}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Artworks;
