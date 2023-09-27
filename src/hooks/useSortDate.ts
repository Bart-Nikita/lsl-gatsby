export const sortDate = (arg: { date: Date }[], order: 'ASC' | 'DESC' = 'ASC') => {
    if (order === 'ASC') {
        return arg.sort((a, b) => a.date < b.date ? -1 : 1)

    } else {
        return arg.sort((a, b) => a.date > b.date ? -1 : 1)

    }
}
