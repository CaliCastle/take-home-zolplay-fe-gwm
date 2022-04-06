import React, {ReactNode, lazy} from 'react'

const Home = lazy(() => import("../view/gameHome"))
const Detail = lazy(() => import("../view/gameDetail"))
const MyCollection = lazy(() =>import("../view/myCollection"))

interface IRoute {
    title: string;
    path: string;
    component: ReactNode;
    key: number
    children?: IRoute[];
}

const router: IRoute[] = [
    {
        title: '游戏商城',
        path: '/gameHome',
        component: <Home></Home>,
        key: 1,
    },
    {
        title: '游戏详情',
        path: '/gameDetail',
        component: <Detail></Detail>,
        key: 2,
    },
    {
        title: '我的收藏',
        path: '/myCollection',
        component: <MyCollection></MyCollection>,
        key: 3,
    }
]
export default router