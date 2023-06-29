export class BlogInfo {

    private readonly _fullname: string
    private readonly _username: string
    private readonly _domain: string
    private readonly _title: string
    private readonly _description: string
    private readonly _defaultProfile: string

    constructor(
        fullname: string,
        username: string,
        domain: string,
        title: string,
        description: string,
        defaultProfile: string,
    ) {
        this._fullname = fullname
        this._username = username
        this._domain = domain
        this._title = title
        this._description = description
        this._defaultProfile = defaultProfile
    }

    get domain(): string {
        return this._domain
    }

    get title(): string {
        return this._title
    }

    get fullname(): string {
        return this._fullname
    }

    get username(): string {
        return this._username
    }

    get description(): string {
        return this._description
    }

    get defaultProfile(): string {
        return this._defaultProfile
    }

    static create(
        fullname: string,
        username: string,
        domain: string,
        title: string,
        description: string,
        defaultProfile: string
    ): BlogInfo {
        return new BlogInfo(
            fullname,
            username,
            domain,
            title,
            description,
            defaultProfile
        )
    }
}
