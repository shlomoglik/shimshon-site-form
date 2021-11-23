import styles from "./Input.module.css"

export default function Dropdown({ title, value, onSelect = () => { }, options = "", list = [], state = {} }) {

    function onChange(e) {
        onSelect(e.target.value);
    }

    return (
        <div className={styles.wrraper}>
            <label>{title}</label>
            <select onChange={onChange} value={value}>
                <option value="">--בחר--</option>
                {state && state[options]?.map(({ id, title }) => (
                    <option value={id} key={id}>{title}</option>
                ))}
                {list.map(val => (<option value={val} key={val}>{val}</option>))}
            </select>
        </div>
    )
}
