import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import { Spinner, MasonryLayout } from '../components';
import { feedQuery, searchQuery } from '../utils/data';

const Feed = () => {
    const [loading, setLoading] = useState(false);
    const { categoryId } = useParams();
    const [pins, setPins] = useState(null);

    useEffect(() => {
        setLoading(true);

        if (categoryId) {
            const query = searchQuery(categoryId);
            client.fetch(query).then((data) => {
                setPins(data);
                setLoading(false);
            });
        } else {
            client.fetch(feedQuery).then((data) => {
                setPins(data);
                setLoading(false);
            });
        }
    }, [categoryId]);

    if (!pins) return <h2>No Pins availabel</h2>;

    if (loading) return <Spinner message="We are adding new ideas to your feeds!" />;
    return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
