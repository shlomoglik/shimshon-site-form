import styles from "./Input.module.css"

export default function HourInput({ title = "no title", onInput = () => { } }) {

    return (
        <div className={styles.wrraper}>
            <label>{title}</label>
            <input onInput={e => onInput(e.target.value)} type="time" />
        </div>
    )
}
