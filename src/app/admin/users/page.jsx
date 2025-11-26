"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/admin/users").then((res) => {
            setUsers(res.data);
        });
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Users</h1>

            <div className="space-y-4">
                {users.map((u) => (
                    <div key={u._id} className="border p-4 rounded flex justify-between">
                        <div>
                            <p className="font-bold">{u.name}</p>
                            <p>{u.email}</p>
                            <p className="text-sm text-gray-500">Role: {u.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
