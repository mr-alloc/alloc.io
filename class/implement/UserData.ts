export class UserData {

    name: string
    profile_image: string
    position: string
    blog: string
    company: string

    constructor(login: string, profile_image: string, position: string, blog: string, company: string) {
        this.name = login
        this.profile_image = profile_image
        this.position = position
        this.blog = blog
        this.company = company
    }

}
