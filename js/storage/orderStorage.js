const LAST_ORDER_KEY = "cartify_last_order";

export function saveLastOrder(order){
    sessionStorage.setItem(
        LAST_ORDER_KEY,
        JSON.stringify(order)
    );
}

export function getLastOrder() {
    const storedOrder = sessionStorage.getItem(LAST_ORDER_KEY);

    return storedOrder ? JSON.parse(storedOrder) : null;
}

export function clearLastOrder() {
    sessionStorage.removeItem(LAST_ORDER_KEY);
}