export class FileData {
    file_id: number
    file_index: number = 0
    file_path: string
    file_title: string
    create_time: Date
    _issue_number: number = 0

    constructor(file_id: number, file_path: string, file_title: string, create_time: Date) {
        this.file_id = file_id;
        this.file_path = file_path
        this.file_title = file_title
        this.create_time = create_time
    }

    set issueNum(num: number) {
        this._issue_number = num
    }
}
