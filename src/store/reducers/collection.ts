interface IState {
    gameList: any[],
    idList: number[]|string[]
}

const initCollectionState: IState = {
    gameList: [],
    idList: [],
}

export enum collectionAction {
    INIT,
    CHANGE
}

const collection = (state: IState = initCollectionState, action: any) => {
    switch (action.type) {
        case collectionAction.INIT:
            return state
        case collectionAction.CHANGE:
            return {...state, ...action.payload}
        default:
            return state
    }
    // return state
}

export default collection