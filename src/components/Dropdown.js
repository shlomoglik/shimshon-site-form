import styles from "./Input.module.css"

export default function Dropdown({ title, value, onSelect = () => { }, options = "", state = {} }) {

    function onChange(e) {
        onSelect(e.target.value);
    }

    return (
        <div className={styles.wrraper}>
            <label>{title}</label>
            <select onChange={onChange} value={value}>
                <option value="">--בחר--</option>
                {state[options]?.map(({ id, title }) => (
                    <option value={id} key={id}>{title}</option>
                ))}
            </select>
        </div>
    )
}
