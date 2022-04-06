import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Request} from "../http/BasicHttp";
import { Carousel } from 'antd';
import { Button } from 'antd';
import store from "../store";
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';


import { Card } from 'antd';
import {collectionAction} from "../store/reducers/collection";

const { Meta } = Card;

class myCollection extends Component<any, any> {

    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            gameList: []
        }
    }

    render() {
        return (
            <div style={{display: 'flex', flexWrap: 'wrap', padding: '70px 10px 20px', boxSizing: "border-box"}}>
                <Button onClick={() => {
                    this.props.history.goBack()
                }} style={{position: "absolute", top: 20, left: 20}}>back</Button>
                {
                    this.state.gameList.map((r: any, i: number) => {
                        return (
                            <Card
                                onClick={(e) => {
                                    e.stopPropagation()
                                    this.goDetail(r)
                                }}
                                hoverable
                                style={{ width: 240, margin: '10px 5px 0' }}
                                cover={<div style={{backgroundImage: 'url(' + r.thumbnail + ')', height: 300, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>}
                                actions={[
                                    // <SettingOutlined key="setting" />,
                                    // <EditOutlined key="edit" />,
                                    // <EllipsisOutlined key="ellipsis" />,
                                    <DeleteOutlined onClick={(e) => {
                                        e.stopPropagation()
                                        this.deleteGame(i)
                                    }}/>
                                ]}
                            >
                                <Meta title={r.title} description={r.genre} />
                            </Card>
                        )
                    })
                }
            </div>
        );
    }

    componentDidMount() {
        console.log(111)
        this.setState(() => {
            return {
                gameList: store.getState().collection.gameList
            }
        })
    }

    deleteGame = (i: number) => {
        let gameList = store.getState().collection.gameList.concat()
        let idList = store.getState().collection.idList.concat()
        gameList.splice(i, 1)
        idList.splice(i, 1)
        this.setState(() => {
            return {
                gameList: gameList
            }
        })
        store.dispatch({
            type: collectionAction.CHANGE,
            payload: {
                gameList: gameList,
                idList: idList
            }
        })
    }

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

}
export default withRouter(myCollection)

