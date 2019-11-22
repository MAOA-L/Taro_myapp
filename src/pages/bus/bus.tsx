import Taro, {Component} from '@tarojs/taro'
import './bus.scss'
import {AtAccordion, AtCard, AtList, AtSearchBar} from "taro-ui";
import {View} from "@tarojs/components";

export default class Bus extends Component {
    config = {
        navigationBarTitleText: '公交信息'
    }

    app = Taro.getApp()

    componentWillMount() {
        this.getBusStations()
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    constructor() {
        super(...arguments)
        this.state = {
            value: '',
            open: [1, 0],
            bus: [
                {number: 102, road: "a->b", note: "This is note"},
                {number: 103, road: "c->d", note: "This is note2"}
            ],

        }
    }

    getBusStations() {
        Taro.request({
            url: this.app.host+'/bus/getBusStations/',
            // url: 'http://ws.cyanzoy.top/v1/pc/intelligence/conference/getIntelligenceConferenceTypeList/',
            data: {
                foo: 'foo',
                bar: 10
            },
            header: {
                'content-type': 'application/json'
            }
        }).then(res => {
            console.log(res.data.data)
            this.setState({
                bus: res.data.data
            })
            console.log(this.state['bus'])
        })
    }

    onChange(value) {
        this.setState({
            value: value
        })
    }

    onActionClick() {
        console.log('开始搜索')
    }

    handleClick(e) {
        console.log(e)
        this.setState({
            open: !e
        })
    }

    render() {
        return (
            <View>
                <AtSearchBar
                    showActionButton
                    value={this.state["value"]}
                    onChange={this.onChange.bind(this)}
                    onActionClick={this.onActionClick.bind(this)}
                />
                {
                    this.state["bus"].map(obj => {
                        return <AtAccordion
                            open={this.state["open"]}
                            onClick={this.handleClick.bind(this, this.state["open"])}
                            title='2字开头'
                            icon={{value: 'streaming', color: 'red', size: '18'}}
                            hasBorder={false}
                            isAnimation={false}>
                            <AtList hasBorder={false}>
                                <AtCard
                                    note={obj.note}
                                    extra={obj.road}
                                    title={obj.number}
                                    thumb='data:image/png;base64,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'
                                >
                                    这也是内容区 可以随意定义功能
                                </AtCard>
                                <AtCard
                                    note='小Tips'
                                    extra='哪里开往哪里'
                                    title='车号'
                                    thumb='data:image/png;base64,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'
                                >
                                    这也是内容区 可以随意定义功能
                                </AtCard>
                            </AtList>
                        </AtAccordion>
                    })
                }

            </View>
        )
    }
}