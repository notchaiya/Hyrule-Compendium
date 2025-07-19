export default function Filter({ onSelect }) {
  return (
    <div>
      <span>Filter by</span>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="creatures">creatures</option>
        <option value="equipment">equipment</option>
        <option value="materials">materials</option>
        <option value="monsters">monsters</option>
        <option value="treasure">treasure</option>
      </select>
    </div>
  );
}
