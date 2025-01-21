export default interface FooterLink {
    label: string
    class?: string
    click?: (...args: any[]) => void
}