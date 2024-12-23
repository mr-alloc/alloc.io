
export function slugify(target: string, forUrlEncode: boolean): string {
    const slug = target.trim().toLowerCase().replace(/\s+/g, '-')
    return forUrlEncode
        ? encodeURIComponent(slug)
        : slug
}
