import React, { useEffect, useState } from "react";
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Search = ({ searchTerm }) => {
    const [pins, setPins] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(searchTerm) {
            setLoading(true);
            const query = searchQuery(searchTerm.toLowerCase());
            client.fetch(query).then((data) => {
                setPins(data[0]);
                setLoading(false);
            })
        } else {
            client.fetch(feedQuery).then((data) => {
                setPins(data[0]);
                setLoading(false);
            })
        }
    }, [searchTerm])
    return (
        <div>
            {console.log(pins)}
            {loading && <Spinner message="Searching for pins"/>}
            {(pins && pins.length !== 0) && ( pins.length > 1 ? <MasonryLayout pins={pins}/> : <MasonryLayout pins={[pins]}/> )}
            {(pins && pins.length === 0) && searchTerm !== '' && !loading && (
                <div className="mt-10 text-center text-xl">
                    No Pins Found
                </div>
            ) }
        </div>
    )
}

export default Search