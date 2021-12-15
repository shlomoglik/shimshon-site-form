import { useRef, useState } from "react"
import { uuid } from "../utils/uuid"
import FileThumb from "./FileThumb"
import styles from "./Input.module.css"

function FileInput({ onUpload, limit = 1 }) {
    const [id] = useState(uuid())
    const fileRef = useRef()

    function handleFileChange(e) {
        const files = e.target.files
        for (let i = 0; i < files.length && i < limit; i++) {
            const reader = new FileReader();
            const file = files[i];
            // reader.onload = () => {
            // };
            reader.onprogress = (evt) => {
                console.log("load in progress ", evt.total);
            };
            reader.onloadend = (evt) => {
                const docData = Object.assign(
                    {
                        id: uuid(),
                        title: file.name,
                        contentType: file.type,
                        size: file.size,
                        url: reader.result,
                        type: file.type,
                        created: +new Date(),
                        file,
                    }
                );
                console.log("load end", docData);
                onUpload(docData)
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div>
            <button onClick={e => fileRef.current.click()}>+ קבצים</button>
            <input type="file" name="files" id={id} ref={fileRef} hidden onChange={handleFileChange} multiple />
        </div>
    )
}

export default function FilesInput({ limit = 1, files = [], label = "קבצים", handleAddFiles = () => null, handleRemoveFile = () => null }) {

    return (
        <div className={styles.wrraper} style={{ display: "grid", alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <label>{label}</label>
            {files.map(attachment => (
                <FileThumb key={attachment.id} attachment={attachment} handleRemoveFile={() => handleRemoveFile(attachment.id)} />
            )
            )}
            {files.length < limit &&
                <FileInput onUpload={handleAddFiles} limit={limit} />
            }
        </div>
    )
}
