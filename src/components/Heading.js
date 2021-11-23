import React, { useState } from 'react'
import { formatDateDisplay } from '../utils/date'


const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5px 3rem",
    color: "#3a3a3a",
}


export default function Heading({ title, datetime }) {
    const [timestamp] = useState(formatDateDisplay())
    return (
        <div style={style}>
            <h2>{title}</h2>
            {datetime && <div>{timestamp}</div>}
        </div>
    )
}
