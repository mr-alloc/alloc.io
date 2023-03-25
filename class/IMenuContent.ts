import { MenuType } from "~/class/constant/MenuType";
import Switch from "~/class/implement/Switch";



export interface IMenuContent {

    menuType(): MenuType

    icon(): string

    hasIcon(): boolean

    title(): string

    link(): string

    withMenuType(menuType: MenuType): IMenuContent

}
