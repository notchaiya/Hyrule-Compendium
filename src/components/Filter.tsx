import type { SelectCategory } from "./NavBar.jsx";

export default function Filter({ onSelect }: SelectCategory) {
    return (
        <div className="dark:text-dark-font font-bold">
            <span>Filter by</span>
            <select
                onChange={(e) => onSelect(e.target.value)}
                className="hover:cursor-pointer"
            >
                <option value="monsters">monsters</option>
                <option value="creatures">creatures</option>
                <option value="equipment">equipment</option>
                <option value="materials">materials</option>
                <option value="treasure">treasure</option>
            </select>
        </div>
    );
}

