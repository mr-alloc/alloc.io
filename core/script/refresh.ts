import {remove, write} from "@core/util/FileUtil";

export default async (path: string, data: any, isString?: boolean) => {
    await remove(path);
    console.log('삭제');

    const dataString = isString
        ? data
        : JSON.stringify(data, null, 2);

    await write(path, dataString);
    console.log('쓰기')
}
