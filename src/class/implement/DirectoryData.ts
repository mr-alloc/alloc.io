import { FileData } from "@/class/implement/FileData";

export class DirectoryData {

    directory_name: string
    files: FileData[]

    constructor(directory_name: string, files: FileData[]) {
        this.directory_name = directory_name
        this.files = files
    }

}
