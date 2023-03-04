import {DirectoryData} from "@/class/implement/DirectoryData";

export class WrapperData {

    base_path: string = '/src/docs'
    directories: DirectoryData[] = []

    constructor(directories: DirectoryData[] ) {
        this.directories = directories
    }
}
