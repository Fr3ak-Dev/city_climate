import { useState } from "react";
import { countries } from "../../data/countries";
import styles from './Form.module.css';
import { SearchType } from "../../types";

export default function Form() {

    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    }

    return (
        <form className={styles.form}>
            <div className={styles.field}>
                <label htmlFor="city">City:</label>
                <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="City"
                    value={search.city}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="country">Country:</label>
                <select
                    id="country"
                    name="country"
                    value={search.country}
                    onChange={handleChange}
                    // className="text-black"
                >
                    <option value="">-- Select a country --</option>
                    {countries.map(country => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
            <input className={styles.submit} type="submit" value='Check Weather' />
        </form>
    )
}
