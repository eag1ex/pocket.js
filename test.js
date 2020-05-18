
const pickBy = (obj = {}) => {
    return Object.entries(obj).reduce((n, el, i) => {
        const [k, val] = el
        if (val) n[k] = val
        return n
    }, {})
}

console.log(pickBy({ mike: 1, n: null }))