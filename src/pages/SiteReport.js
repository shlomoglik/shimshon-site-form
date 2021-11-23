import { useContext, useEffect, useRef, useState } from 'react';
import { fbContext } from "../state/fbContext"
import { SITES, ROLES, USERS } from "../state/collections"
import styles from './Page.module.css';
import Dropdown from '../components/Dropdown';
import DateInput from '../components/DateInput';
import Group from '../components/Group';
import Heading from '../components/Heading';

const timeTrackHeaders = { userName: { label: "שם", type: "list", options: USERS }, role: { label: "תפקיד", type: "list", options: ROLES }, from: { label: "משעה", type: "hour" }, to: { label: "עד שעה", type: "hour" } }
const pitHeaders = { pit: { label: "מספר בור", type: "text" }, deep: { label: "עומק", type: "number" } }
const groupDefaultItems = {
  operators: { userName: "", role: "operator", from: "", to: "" },
  pits: { pit: "1", deep: 0 },
}
const initialData = {
  user: "",
  site: "",
  date: "",
  operators: [{ ...groupDefaultItems.operators, id: Math.floor(Math.random() * 100) }],
  pits: [{ ...groupDefaultItems.pits, id: Math.floor(Math.random() * 100) }],
}

export default function SiteReport() {

  const state = useContext(fbContext)

  const [valid, setValid] = useState(false)
  const [docData, setDocData] = useState(initialData)

  const formRef = useRef(null)
  //fetch state from firebase

  useEffect(() => {

    //validation
    let valid = true
    if (!docData.site) valid = false
    if (!docData.date) valid = false
    if (!docData.user) valid = false
    if (!docData.operators[0] || !docData.operators[0].userName || !docData.operators[0].from || !docData.operators[0].to) valid = false
    if (!docData.pits[0] || !docData.pits[0].pit || !docData.pits[0].deep) valid = false
    setValid(valid)

  }, [docData])

  function updateSite(id) {
    updateField("site", id)
  }
  function updateDate(value) {
    updateField("date", value)
  }
  function updateUser(value) {
    updateField("user", value)
  }

  function updateField(key, value) {
    setDocData({ ...docData, [key]: value })
  }


  function updateGroup(group, id, field, value) {
    const updatedGroup = docData[group].map(item => {
      if (item.id === id) {
        return { ...item, [field]: value }
      }
      return item
    })
    setDocData({ ...docData, [group]: updatedGroup })
  }

  function removeItemFromGroup(group, id) {
    const updatedGroup = docData[group].filter(item => item.id !== id)
    setDocData({ ...docData, [group]: updatedGroup })
  }
  function addItemToGroup(group) {
    const newGroup = { ...groupDefaultItems[group], id: Math.floor(Math.random() * 100000) }
    if (group === "pits") {
      newGroup.pit = docData[group].reduce((acc, prev) => Math.max(acc, parseInt(prev.pit || "1".match(/\d+/)[0]) + 1), 1)
    }
    const updatedGroup = [...docData[group], newGroup]
    setDocData({ ...docData, [group]: updatedGroup })
  }

  function resetForm() {
    setDocData({ ...initialData })
    formRef.current.reset();
  }

  async function sendData() {
    try {
      const url = "https://hook.integromat.com/l9khxcxopdqwv227kiywqlqr0b4wt6ff"
      const res = await fetch(url, {
        method: "POST",
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify(docData)
      })
      console.log(res);
      // const json = await res.json() 
      // console.log(json)
      resetForm();
    } catch (error) {
      alert(error)
    }
  }


  return (
    <main className={styles.main}>
      <Heading title="דוח קידוחי אתר יומי - שמשון קידוחים" datetime />
      <form ref={formRef} onSubmit={e => e.preventDefault()} className={styles.form}>
        <Dropdown state={state} title="שם ממלא דוח" value={docData.user} onSelect={updateUser} options={USERS} />
        <DateInput title="תאריך עבודה" value={docData.date} onInput={updateDate} />
        <Dropdown state={state} title="אתר" value={docData.site} onSelect={updateSite} options={SITES} />
        <Group
          state={state}
          items={docData.operators}
          title="עובד/ים"
          headers={timeTrackHeaders}
          addItem={() => addItemToGroup("operators")}
          editItem={(id, key, val) => updateGroup("operators", id, key, val)}
          removeItem={(id) => removeItemFromGroup("operators", id)}
        />
        <Group
          state={state}
          items={docData.pits}
          title="בור/ות"
          headers={pitHeaders}
          addItem={() => addItemToGroup("pits")}
          editItem={(id, key, val) => updateGroup("pits", id, key, val)}
          removeItem={(id) => removeItemFromGroup("pits", id)}
        />
      </form>
      <div style={{ padding: '2rem 0', marginTop: '2rem', display: 'grid', alignItems: 'center', justifyContent: 'center' }}>
        <button
          style={{ backgroundColor: valid ? "navy" : "gray", color: 'white' }}
          disabled={!valid}
          onClick={sendData}
        >
          שלח דיווח
        </button>
      </div>
    </main>
  );
}
