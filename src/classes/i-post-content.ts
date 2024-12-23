import Header from "@/classes/implement/header";

export default interface IPostContent {

    get path(): string;

    get header(): Header;

    get description(): string

    get content(): string;
}
