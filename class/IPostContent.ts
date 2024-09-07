import Header from "@/class/implement/Header";

export default interface IPostContent {

    get path(): string;

    get header(): Header;

    get description(): string

    get content(): string;
}
