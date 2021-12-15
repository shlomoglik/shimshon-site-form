import styles from "./File.module.css"

export default function FileThumb({
    handleRemoveFile = () => null,
    attachment = { id: "", title: "", type: "", url: "" }
}) {
    console.log(attachment.type)
    return (
        <div className={styles.fileThumb}>
            <span className={styles.close} onClick={handleRemoveFile}>הסרה</span>
            <span>{attachment.title}</span>
            {attachment.type === "application/pdf" &&
                <iframe
                    style={{ maxWidth: "100%" }}
                    title="תצוגה מקדימה"
                    name="תצוגה מקדימה"
                    src={attachment.url}
                    height="300"
                    align="center"
                    allow="fullscreen"
                    frameBorder="0"
                />
            }
            {attachment.type.startsWith("image/") &&
                < img
                    style={{ maxWidth: "100%", objectFit: "contain", height: "320px", width: "320px" }}
                    src={attachment.url}
                    alt={attachment.title}
                />
            }
        </div>
    )
}
