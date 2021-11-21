import { doc, setDoc } from "@firebase/firestore"
import {  useState } from "react"
import { db } from "../App"
import Group from "../components/Group"
import Heading from "../components/Heading"
import styles from "./Page.module.css"

const employeesHeaders = { title: { label: "שם", type: "text" }, phone: { label: "טלפון", type: "text" } }

export default function Settings() {
    const [employees, setEmployees] = useState([])
    const [changes, setChanges] = useState({
        employees: {}
    })

    function addNewEmployee() {
        setEmployees([...employees, { title: "", phone: "", id: Math.floor(Math.random() * 100000), valid: false }])
    }
    async function saveEmployee(id) {
        try {
            const newEmployee = employees.find(emp => emp.id === id)
            if (newEmployee) {
                const docRef = doc(db, `users/${id}`)
                await setDoc(docRef, newEmployee, { merge: true })
                removeEmployee(id)
            }
        } catch (err) {
            alert(err)
        }
    }
    function editEmployee(id, key, val) {
        setChanges(Object.assign({}, changes, { employees: { [key]: val } }))
        const updatedList = employees.map(emp => {
            if (emp.id === id) return { ...emp, [key]: val, valid: emp.title && emp.title.legnth > 2 }
            return emp
        })
        setEmployees(updatedList)
    }
    function removeEmployee(id) {
        setEmployees(employees.filter(emp => emp.id !== id))
    }
    return (
        <main className={styles.main}>
            <Heading title="הגדרות מערכת" />
            <div className={styles.form}>
                <Group
                    items={employees}
                    title="עובדים"
                    headers={employeesHeaders}
                    addItem={() => addNewEmployee()}
                    editItem={(id, key, val) => editEmployee(id, key, val)}
                    saveItem={(id) => saveEmployee(id)}
                    removeItem={(id) => removeEmployee(id)}
                    hasChanges={Object.keys(changes.employees).length > 0}
                    allowSave
                />
            </div>
        </main>
    )
}
