import styles from "./Input.module.css"
import DateInput from "./DateInput"
import TextInput from "./TextInput"
import HourInput from "./HourInput"
import NumberInput from "./NumberInput"
import Dropdown from "./Dropdown"

export default function Group({
    title = "",
    addItem = () => { },
    editItem = () => { },
    saveItem = () => { },
    allowEmpty = false,
    allowSave = false,
    hasChanges = false,
    removeItem = () => { },
    state = {},
    items = [{ name: "", from:
     "", to: "", id: 1 }],
    headers = { name: { label: "שם", type: "list", options: "users" }, from: { label: "משעה", type: "hour" }, to: { label: "עד שעה", type: "hour" } }
}) {

    return (
        <div className={styles.wrraper}>
            <label>{title}</label>
            {items.map((item, ind, arr) => (
                <div key={item.id} className={styles.group}>
                    {Object.entries(headers).map(([header, { type, label, options }]) => {
                        return type === "text" ?
                            <TextInput value={item[header]} title={label} key={`${item.id}_${header}`} onInput={(val) => editItem(item.id, header, val)} /> :
                            type === "list" ?
                                <Dropdown value={item[header]} title={label} key={`${item.id}_${header}`} state={state} options={options} onSelect={(val) => editItem(item.id, header, val)} /> :
                                type === "options" ?
                                    <Dropdown value={item[header]} title={label} key={`${item.id}_${header}`} list={options} onSelect={(val) => editItem(item.id, header, val)} /> :
                                    type === "hour" ?
                                        <HourInput value={item[header]} title={label} key={`${item.id}_${header}`} onInput={(val) => editItem(item.id, header, val)} /> :
                                        type === "number" ?
                                            <NumberInput value={item[header]} title={label} key={`${item.id}_${header}`} onInput={(val) => editItem(item.id, header, val)} /> :
                                            type === "date" ?
                                                <DateInput value={item[header]} title={label} key={`${item.id}_${header}`} onInput={(val) => editItem(item.id, header, val)} /> : ""

                    })
                    }
                    {(arr.length > 1 || allowEmpty) && <button style={{ backgroundColor: 'white', color: 'red' }} onClick={() => removeItem(item.id)}>מחק</button>}
                    {(allowSave && hasChanges) && <button style={{ backgroundColor: 'navy', color: 'white' }} onClick={() => saveItem(item.id)}>שמור</button>}
                </div>
            ))}
            <button onClick={addItem}>+ הוסף {title || "חדש"}</button>
        </div>
    )
}