export function formatDateDisplay({date=new Date(), options = {}}={}) {
    if (isNaN(date.getMilliseconds())) return "----/--/--"

    const y = date.getFullYear();
    let m = date.getMonth(); m++;
    if (Number(m).toString() < 10) m = "0" + m
    let d = date.getDate();
    if (Number(d).toString() < 10) d = "0" + d

    const outputFormat = options.outputFormat || "dd/mm/yyyy"
    let output
    if (outputFormat === "dd/mm/yyyy") {
        output = d + "/" + m + "/" + y;
    } else if (outputFormat === "dd/mm/yy") {
        output = d + "/" + m + "/" + y.toString().substring(2);
    } else if (outputFormat === "yyyy-MM-dd") {
        output = y + "-" + m + "-" + d
    } else if (outputFormat === "dd=>mm") {
        const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]
        const monthName = months[date.getMonth() % 12]
        output = d + " ל" + monthName
    }
    if (options.useHours) {
        let h = date.getHours();
        let mm = date.getMinutes();
        if (h < 10) h = `0${h}`
        if (mm < 10) mm = `0${mm}`
        output += ` ${h}:${mm}`
    }
    return output;
}