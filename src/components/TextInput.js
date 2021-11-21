import styles from "./Input.module.css"

export default function TextInput({ value,title, onInput = () => { } }) {

    return (
        <div className={styles.wrraper}>
            {title && <label>{title}</label>}
            <input value={value} onInput={e => onInput(e.target.value)} type="text" />
        </div>
    )
}
