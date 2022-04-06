import React, {Component, useState} from "react";
import store from "../store";
import collection, {collectionAction} from "../store/reducers/collection";
import { withRouter } from "react-router-dom";
import { Request } from "../http/BasicHttp";
import "./gameHome.css"
import { PlusOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { AutoComplete, message } from 'antd';
import { BookOutlined } from '@ant-design/icons'

const { SubMenu } = Menu;

// const [setOptions] = useState<{ value: string }[]>([]);
// const [options, setOptions] = useState<{value: string}>(() => (
//
// ))
//


class GameHome extends Component<any, any> {

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            gameList: [],
            typeList: [],
            nameList: [],
            option: [],
            changeType: '',
            changeName: '',
            bigBox: React.createRef()
        }
    }

    render() {
        return (
                <div style={{display: 'flex', height: '100%'}}>
                    <div style={{height: "100%", overflowY: "auto", width: 273, marginRight: 20, position: 'relative', paddingTop: 60}}>
                        <AutoComplete
                            options={this.state.option}
                            style={{ width: 200, position: 'absolute', top: 20, left: 0, right: 0, margin: '0 auto'}}
                            onSelect={this.onSelect}
                            onSearch={this.onSearch}
                            placeholder="input here"
                        />
                        <Menu
                            onClick={this.handleClick}
                            style={{ width: 256 }}
                            defaultSelectedKeys={[this.state.typeList.length]}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                        >
                            <Menu.Item key={this.state.typeList.length}>ALL</Menu.Item>
                            {
                                this.state.typeList.map((r: any, i: number) => (
                                    <Menu.Item key={i}>{r}</Menu.Item>
                                ))
                            }
                        </Menu>
                    </div>
                    <div style={{height: '100%', flex: '1', overflowY: "auto", paddingTop: 20}} ref={this.state.bigBox}>
                        <div className={'list-box'}>
                            {
                                this.state.gameList.map((r: any) => {
                                    if(this.state.changeName === r.title || r.genre === this.state.changeType || this.state.changeType == ''){
                                        return (
                                            <div onClick={(e) => {
                                                e.stopPropagation()
                                                this.goDetail(r)
                                            }} className={'game-box'} key={r.id}>
                                                <img src={r.thumbnail}></img>
                                                <p className={'game-title'}>
                                                    {r.title}
                                                    <PlusOutlined onClick={(e) => {
                                                        e.stopPropagation()
                                                        this.change(r)
                                                    }} style={{float: 'right'}}/>
                                                </p>

                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div onClick={this.goCollection} style={{position: 'fixed', bottom: 80, right: 40, background: 'black', width: 100, height: 100, borderRadius: '50%', cursor: 'pointer'}}>
                        <div>
                            <p style={{fontSize: 28, color: '#ffffff', textAlign: "center", paddingTop: 10, marginBottom: 0}}>
                                <BookOutlined />
                            </p>
                            <p style={{fontSize: 16, color: '#ffffff', textAlign: "center", marginTop: 5}}>
                                收藏夹
                            </p>
                        </div>
                    </div>
                </div>

        );
    }

    componentDidMount = () => {
        this.setState(() => {
            return {
                num: 100
            }
        })
        this.getGames()
    }

    getGames = () => {
        Request.axiosInstance({
            url: '/games',
            method: 'get',
        }).then((res: any) => {
            if(res.status === 200){
                let typeList: any[] = []
                let nameList: {value: string}[] = []
                res.data.forEach((r: any) => {
                    nameList.push({
                        value: r.title
                    })
                    if(typeList.indexOf(r.genre) == -1){
                        typeList.push(r.genre)
                    }
                })
                this.setState(() => {
                    return {
                        gameList: res.data,
                        typeList,
                        nameList,
                        option: nameList,
                    }
                })
            }
        })
    }

    handleClick = (e: any) => {
        this.state.bigBox.current.scrollTop = 0
        let type = this.state.typeList[e.key]?this.state.typeList[e.key]:''
        this.setState(() => {
            return {
                changeType: type,
                changeName: ''
            }
        })
    };

    change = (obj: any) => {
        if(store.getState().collection.idList.indexOf(obj.id) == -1){
            store.dispatch({
                type: collectionAction.CHANGE,
                payload: {
                    gameList: [...store.getState().collection.gameList, obj],
                    idList: [...store.getState().collection.idList, obj.id]
                }
            })
            message.success("添加成功");
        }else{
            message.error("已存在");
        }
    }

    mockVal = (str: string) => {
        if(str == ''){
            return this.state.nameList
        }
        let option: {value: string}[] = []
        this.state.nameList.forEach((r: {value: string}) => {
            if(r.value.indexOf(str) != -1){
                option.push(r)
            }
        })
        return option
    };

    onSearch = (searchText: string) => {
        this.setState(() => {
            return {
                option: this.mockVal(searchText)
            }
        })
    };

    onSelect = (data: string) => {
        this.setState(() => {
            return {
                changeName: data,
                changeType: this.state.typeList.length + 1
            }
        })
    };

    goDetail = (item: any) => {
        // console.log(1)
        console.log(item)
        this.props.history.push({
            pathname: '/gameDetail',
            state: {
                id: item.id
            }
        })
    }

    goCollection = () => {
        this.props.history.push({
            pathname: '/myCollection'
        })
    }
}

export default withRouter(GameHome)

