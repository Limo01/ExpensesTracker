export function getTotalFromItemsList(items, toFixed=true) {
    if (items === undefined) {
        return toFixed? parseFloat(0).toFixed(2) : 0;
    }

    let total = 0;

    items.forEach(item => {
        total += item.amount;
    });

    return toFixed? total.toFixed(2) : total;
}
