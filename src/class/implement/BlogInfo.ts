export class BlogInfo {

    private readonly _fullName: string
    private readonly _username: string
    private readonly _domain: string
    private readonly _title: string
    private readonly _description: string
    private readonly _defaultProfile: string

    constructor(
        fullName: string,
        username: string,
        domain: string,
        title: string,
        description: string,
        defaultProfile: string,
    ) {
        this._fullName = fullName
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

    get fullName(): string {
        return this._fullName
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
        fullName: string,
        username: string,
        domain: string,
        title: string,
        description: string,
        defaultProfile: string
    ): BlogInfo {
        return new BlogInfo(
            fullName,
            username,
            domain,
            title,
            description,
            defaultProfile
        )
    }
}
