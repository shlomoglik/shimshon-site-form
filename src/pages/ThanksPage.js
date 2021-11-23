import { Link } from "react-router-dom"
import styles from "./Page.module.css"

export default function ThanksPage() {
    return (
        <main className={styles.main}>
            <div
                style={{
                    display: 'grid',
                    fontSize: '22px',
                    minHeight: '80vh',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignContent: "center",
                    textAlign: 'center'
                }}>
                <p style={{fontWeight:'800' , color:'purple' , fontSize:'30px'}}>
                    הטופס נקלט בהצלחה
                </p>
                <Link
                    to="/"
                    style={{ color: 'navy', textDecoration: 'none', cursor: 'pointer' }}
                >
                    להגשת טופס נוסף
                </Link>
            </div>
        </main>
    )
}
