import { doc, setDoc } from "@firebase/firestore"
import { useContext, useState } from "react"
import { db } from "../App"
import Group from "../components/Group"
import Heading from "../components/Heading"
import { fbContext } from "../state/fbContext"
import styles from "./Page.module.css"

const employeesHeaders = { title: { label: "שם", type: "text" }, phone: { label: "טלפון", type: "text" } }
const siteHeaders = { title: { label: "שם", type: "text" } }

export default function Settings() {
    const { users , sites} = useContext(fbContext);
    const [employees, setEmployees] = useState([])
    const [sitesList, setSites] = useState([])
    const [changes, setChanges] = useState({
        employees: {},
        sitesList:{}
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
    
    function addNewSite(){
        setSites([...sitesList, { title: "",id: Math.floor(Math.random() * 100000)}])
    }
    async function saveSite(id) {
        try {
            const newSite = sitesList.find(emp => emp.id === id)
            if (newSite) {
                const docRef = doc(db, `sites/${id}`)
                await setDoc(docRef, newSite, { merge: true })
                removeSite(id)
            }
        } catch (err) {
            alert(err)
        }
    }
    function editSite(id, key, val) {
        setChanges(Object.assign({}, changes, { sitesList: { [key]: val } }))
        const updatedList = sitesList.map(site => {
            if (site.id === id) return { ...site, [key]: val, valid: site.title && site.title.legnth > 2 }
            return site
        })
        setSites(updatedList)
    }
    function removeSite(id) {
        setSites(sitesList.filter(site => site.id !== id))
    }

    return (
        <main className={styles.main} style={{gap:'1rem'}}>
            <Heading title="הגדרות מערכת" />
            <div className={styles.form}>
                <h3>רשימת עובדים</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                    <h5>מזהה</h5>
                    <h5>שם</h5>
                    <h5>טלפון</h5>
                    {users.length === 0 && <p>נראה שאין עובדים ברשימה כרגע</p>}
                    {users.map(user => (
                        <>
                            <div key={user.id + "id"} style={{ border: "1px solid gray", margin: '0', padding: "5px" }}>{user.id}</div>
                            <div key={user.id + "title"} style={{ border: "1px solid gray", margin: '0', padding: "5px" }}>{user.title}</div>
                            <div key={user.id + "phone"} style={{ border: "1px solid gray", margin: '0', padding: "5px" }}>{user.phone}</div>
                        </>
                    ))}
                </div>
                <Group
                    items={employees}
                    title=""
                    headers={employeesHeaders}
                    addItem={() => addNewEmployee()}
                    editItem={(id, key, val) => editEmployee(id, key, val)}
                    saveItem={(id) => saveEmployee(id)}
                    removeItem={(id) => removeEmployee(id)}
                    hasChanges={Object.keys(changes.employees).length > 0}
                    allowSave
                    allowEmpty
                />
            </div>

            <div className={styles.form}>
                <h3>רשימת אתרים</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    <h5>מזהה</h5>
                    <h5>שם אתר</h5>
                    {sites.length === 0 && <p>נראה שאין אתרים ברשימה כרגע</p>}
                    {sites.map(site => (
                        <>
                            <div key={site.id + "id"} style={{ border: "1px solid gray", margin: '0', padding: "5px" }}>{site.id}</div>
                            <div key={site.id + "title"} style={{ border: "1px solid gray", margin: '0', padding: "5px" }}>{site.title}</div>
                        </>
                    ))}
                </div>
                <Group
                    items={sitesList}
                    title=""
                    headers={siteHeaders}
                    addItem={() => addNewSite()}
                    editItem={(id, key, val) => editSite(id, key, val)}
                    saveItem={(id) => saveSite(id)}
                    removeItem={(id) => removeSite(id)}
                    hasChanges={Object.keys(changes.sitesList).length > 0}
                    allowSave
                    allowEmpty
                />
            </div>
        </main>
    )
}
