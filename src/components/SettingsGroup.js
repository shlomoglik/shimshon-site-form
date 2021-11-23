import { doc, setDoc } from '@firebase/firestore'
import React, { useState } from 'react'
import { db } from '../App'
import styles from "../pages/Page.module.css"
import { uuid } from '../utils/uuid'
import Group from './Group'



export default function SettingsGroup({
    dbItems = [],
    groupTitle = "עובדים",
    headers = { id: { type: "text", label: "מזהה" }, title: { type: "text", label: "שם" }, phone: { lable: "טלפון", type: "text" } },
    collectionID = "employees"
}) {

    const [items, setItems] = useState([])
    const [changes, setChanges] = useState({})


    function addNewItem() {
        const newItem = {}
        Object.entries(headers).forEach(([header, field]) => {
            newItem[header] = field.defaultValue || ""
        })
        newItem.id = uuid()
        setItems([...items, newItem])
    }

    function editItem(id, key, val) {
        setChanges({ ...changes, [key]: val })
        const updatedList = items.map(item => {
            if (item.id === id) return { ...item, [key]: val }
            return item
        })
        setItems(updatedList)
    }

    async function saveItem(id) {
        try {
            const newEmployee = items.find(item => item.id === id)
            if (newEmployee) {
                const docRef = doc(db, `${collectionID}/${id}`)
                await setDoc(docRef, newEmployee, { merge: true })
                removeItem(id)
            }
        } catch (err) {
            alert(err)
        }
    }

    function removeItem(id) {
        setItems(items.filter(emp => emp.id !== id))
    }

    return (
        <div className={styles.form}>
            <h3>רשימת {groupTitle}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: Object.keys(headers).map(_ => "1fr").join(" ") }}>
                {Object.entries(headers).map(([key, { label }]) => (<h5 key={key}>{label}</h5>))}
                {dbItems.length === 0 && <p>נראה שאין {groupTitle} ברשימה כרגע</p>}
                {dbItems.map((item) => (
                    <>
                        {Object.entries(headers).map(([key]) => (
                            <div key={item.id + key} style={{ border: "1px solid gray", margin: '0', padding: "5px" }}>{item[key]}</div>
                        ))}
                    </>
                ))}
            </div>
            <Group
                items={items}
                title=""
                headers={headers}
                addItem={() => addNewItem()}
                editItem={(id, key, val) => editItem(id, key, val)}
                saveItem={(id) => saveItem(id)}
                removeItem={(id) => removeItem(id)}
                allowSave
                allowEmpty
                hasChanges={Object.keys(changes).length > 0}
            />
        </div>
    )
}
