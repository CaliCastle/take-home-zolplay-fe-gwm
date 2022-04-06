import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Request} from "../http/BasicHttp";
import {Carousel, message} from 'antd';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import store from "../store";
import {collectionAction} from "../store/reducers/collection";

class GameDetail extends Component<any, any> {

    constructor(props: any, context: any) {
        super(props, context);
        console.log(props)

        this.state = {
            gameData: {},
            gameList: []
        }
        console.log(context)
    }

    render() {
        return (
            <div>
                <Button onClick={() => {
                    this.props.history.goBack()
                }} style={{position: "absolute", top: 20, left: 20}}>back</Button>
                <Carousel autoplay  style={{width: 800, margin: '80px auto'}}>
                    {
                        this.state.gameData.screenshots?this.state.gameData.screenshots.map((r: any) => {
                            return (
                                <div key={r.id} style={{width: "100%"}}>
                                    <div style={{backgroundImage: 'url(' + r.image + ')', height: 380, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                                </div>
                            )
                        }):''
                    }
                </Carousel>
                <Button onClick={this.change} style={{position: "absolute", top: 20, right: 20}}>
                    <PlusOutlined/>
                </Button>
                <p style={{fontSize: 22, textAlign: 'center'}}>{this.state.gameData.title}</p>
                <p style={{fontSize: 16, boxSizing: "border-box", padding: '0 20px'}}>{this.state.gameData.description}</p>
            </div>
        );
    }

    componentDidMount() {
        this.getDetail()
    }

    change = () => {
        // console.log(this.state.gameData)
        let obj = this.state.gameData
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

    getDetail = () => {
        Request.axiosInstance({
            url: '/game',
            method: 'get',
            params: {
                id: this.props.location.state.id
            }
        }).then((res ) => {
            // console.log(res)
            // this.loadImage(,(img)=>{
            //     console.log(img);//这里可以不写或者是将上面方法中的回调函数去掉
            // });
            res.data.screenshots.forEach((r: any) => {
                console.log(r)
                this.loadImage(r.image)
            })
            this.setState(() => {
                return {
                    gameData: res.data
                }
            })
        })
    }

    loadImage = (url: string, callback?: Function) => {
        let img = new Image(); //创建一个Image对象，实现图片的预下载
        img.onload = function(){
            img.onload = null;
            callback&&callback(img);
        }
    }

}
export default withRouter(GameDetail)

