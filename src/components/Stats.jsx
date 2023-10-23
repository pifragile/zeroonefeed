import { useEffect, useState } from "react";
import Artworks from "./Artworks";

function Stats() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function action() {
            let res = await fetch(
                `https://orca-app-kk3w6.ondigitalocean.app/zeroone/users`
            );
            let result = await res.json();

            setUsers(result);
        }

        action().catch(console.error);
    }, []);

    if (users.length > 0) {
        users.sort((a, b) => b.num_followers - a.num_followers);
        const topFollowed = users.slice(0, 16);
        users.sort(
            (a, b) => b.num_collected_by_others - a.num_collected_by_others
        );
        const topCollected = users.slice(0, 16);

        users.sort(
            (a, b) => b.num_collected - a.num_collected
        );
        const topCollectors = users.slice(0, 16);
        return (
            <div>
                <p>user data is upated once per day</p>
                <div className="stats">
                    <table>
                        <thead>
                            <tr>
                                <h3>followers</h3>
                            </tr>
                            <tr>
                                <th>user</th>
                                <th>followers</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topFollowed.map((u) => (
                                <tr key={u.Username}>
                                    <td>
                                        <a
                                            href={`https://zeroone.art/profile/${u.Username}`}
                                        >
                                            {u.Username}
                                        </a>
                                    </td>
                                    <td>{u.num_followers}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <table>
                        <thead>
                            <tr>
                                <h3>artworks</h3>
                            </tr>
                            <tr>
                                <th>user</th>
                                <th>artworks distributed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topCollected.map((u) => (
                                <tr key={u.Username}>
                                    <td>
                                        <a
                                            href={`https://zeroone.art/profile/${u.Username}`}
                                        >
                                            {u.Username}
                                        </a>
                                    </td>
                                    <td>{u.num_collected_by_others}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <table>
                        <thead>
                            <tr>
                                <h3>collectors</h3>
                            </tr>
                            <tr>
                                <th>user</th>
                                <th>artworks collected</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topCollectors.map((u) => (
                                <tr key={u.Username}>
                                    <td>
                                        <a
                                            href={`https://zeroone.art/profile/${u.Username}`}
                                        >
                                            {u.Username}
                                        </a>
                                    </td>
                                    <td>{u.num_collected}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Artworks/>
                </div>
                <p>created by piero (pifragile) | <a href="https://zeroone.art/profile/pifragile">zeroone</a> | <a href="https://twitter.com/pifragile">twitter</a> |</p>
            </div>
        );
    }
}

export default Stats;
