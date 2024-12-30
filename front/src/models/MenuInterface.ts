export interface MenuItem {
    title: string,
    items:Item[]
}

export interface Item {
    icon: string,
    label: string,
    href: string
}