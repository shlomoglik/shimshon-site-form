import { useContext } from "react"
import Heading from "../components/Heading"
import SettingsGroup from "../components/SettingsGroup"
import { fbContext } from "../state/fbContext"
import styles from "./Page.module.css"

const employeesHeaders = { id: { label: "מזהה" }, title: { label: "שם", type: "text" }, phone: { label: "טלפון", type: "text" } }
const siteHeaders = { id: { label: "מזהה" }, title: { label: "שם", type: "text" } }
const equipmentHeaders = { id: { label: "מזהה" }, title: { label: "שם", type: "text" } }

export default function Settings() {
    const { users, sites , equipment } = useContext(fbContext)

    return (
        <main className={styles.main} style={{ gap: '1rem' }}>
            <Heading title="הגדרות מערכת" />
            <SettingsGroup collectionID="users" headers={employeesHeaders} groupTitle="עובדים" dbItems={users} />
            <SettingsGroup collectionID="sites" headers={siteHeaders} groupTitle="אתרים" dbItems={sites} />
            <SettingsGroup collectionID="equipment" headers={equipmentHeaders} groupTitle="ציוד כלי עבודה ומכונות" dbItems={equipment} />
        </main >
    )
}
