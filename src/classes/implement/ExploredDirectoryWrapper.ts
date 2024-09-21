import { ExploredDirectory } from "@/classes/implement/ExploredDirectory";

export class ExploredDirectoryWrapper {
    directories: ExploredDirectory [] = []

    constructor(directories: ExploredDirectory []) {
        this.directories = directories
    }
}
