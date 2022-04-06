interface  IUser {
    id: number,
    name: string
}
interface  IState {
    user: IUser
}

const initUserState: IState = {
    user: {
        id: 0,
        name: ''
    }
}

const user = (state: IState = initUserState, action: any) => {
    return state
}

export default user
