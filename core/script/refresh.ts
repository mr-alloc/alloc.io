import {remove, write} from "@core/util/FileUtil";

export default (path: string, data: any, isString?: boolean) => {
    remove(path);

    const dataString = isString
        ? data
        : JSON.stringify(data, null, 2);

    write(path, dataString);
}
