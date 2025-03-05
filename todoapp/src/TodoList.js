import React, { useState, useEffect } from 'react';
import { createDirectus } from '@directus/sdk';

const TodoList = () => {
    // State for holding the to-do list items (initially empty array)
    const [items, setItems] = useState([]);

    // Initialize Directus client
    const client = createDirectus('http://192.168.90.131:8055');

    const getContent = async () => {
        try {
            // Fetch the items from the 'TODOLIST' collection
            const result = await client.items('TODOLIST').read();
            console.log(result);
            setItems(result.data); // Ensure that result.data is always an array
        } catch (err) {
            console.log('This is the error: ', err);
        }
    };

    useEffect(() => {
        getContent();
    }, []);

    return (
        <>
            {/* Header of the Application */}
            <div className="Title-Wrapper">
                <p>To do App</p>
            </div>

            {/* For the main table of the to-do list */}
            <div className="Table-Wrapper">
                <table>
                    <thead>
                        <tr className="topbar">
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(items) && items.length > 0 ? (
                            items.map((item) => (
                                <tr key={item.id}> {/* Use a unique key */}
                                    <td>{item.Title}</td> {/* Adjust to match your field names */}
                                    <td>{item.Description}</td> {/* Adjust to match your field names */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No items found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TodoList;
