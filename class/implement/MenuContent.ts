import {IMenuContent} from "~/class/IMenuContent";
import {MenuType} from "~/class/constant/MenuType";
import Switch from "~/class/implement/Switch";

export class MenuContent implements IMenuContent {

    readonly _title: string
    readonly _link: string
    readonly _icon: string
    _menuType?: MenuType


    constructor(title: string, _link: string, icon?: string) {
        this._title = title
        this._link = _link
        this._icon = icon === undefined
            ? ''
            : icon
    }


    icon(): string {
        return this._icon
    }

    hasIcon(): boolean {
        return this._icon !== ''
    }

    link(): string {
        return this._link
    }

    withMenuType(menuType: MenuType): IMenuContent {
        this._menuType = menuType
        return this
    }

    menuType(): MenuType | null {
        return this._menuType
            ? this._menuType
            : null
    }

    title(): string {
        return this._title
    }



}
