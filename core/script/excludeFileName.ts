export default function(filename: string): boolean {
    const exist = ['.DS_Store', 'directory-map']
        .some(target => filename.includes(target));
    return !exist;

}
