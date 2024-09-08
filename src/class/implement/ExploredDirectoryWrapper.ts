import { ExploredDirectory } from "@/class/implement/ExploredDirectory";

export class ExploredDirectoryWrapper {
    directories: ExploredDirectory [] = []

    constructor(directories: ExploredDirectory []) {
        this.directories = directories
    }
}
