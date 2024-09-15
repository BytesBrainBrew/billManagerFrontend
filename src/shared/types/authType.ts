import { globalFieldType } from "./globalFieldType"

export type loginType = {
    email: globalFieldType,
    password: globalFieldType
}

export type signUpType = {
    email: globalFieldType,
    password: globalFieldType,
    username: globalFieldType
}