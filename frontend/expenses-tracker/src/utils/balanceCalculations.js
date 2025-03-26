export function getTotalFromItemsList(items) {
    let total = 0;

    items.forEach(item => {
        total += item.amount;
    });

    return total.toFixed(2);
}
