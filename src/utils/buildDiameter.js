function main() {
    const result = [35, 45, 50]
    let val = 60
    while (val <= 230) {
        result.push(val)
        val += 10
    }
    console.log(result)
}

main()