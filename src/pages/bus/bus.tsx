import Taro, {Component} from '@tarojs/taro'
import './bus.scss'
import {AtAccordion, AtCard, AtList, AtSearchBar, AtTabs, AtTabsPane} from 'taro-ui';
import {Block, View, Image, Text, ScrollView} from '@tarojs/components';

export default class Bus extends Component {
    config = {
        navigationBarTitleText: '公交信息'
    }

    app = Taro.getApp()

    componentWillMount() {
        this.getBusStations(0,true)
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

            ],
            isActive: 0 /* tabs标签页 */,
        }
    }

    getBusStations(area_id, arg) {
        Taro.showLoading({
            title: '加载中',
            mask: true,
        });
        Taro.request({
            url: this.app.host + '/bus/getBusStations/',
            data: {
                area_id: area_id
            },
            header: {
                'content-type': 'application/json'
            }
        }).then(res => {
            // console.log(res.data.data)
            this.setState({
                bus: res.data.data.list
            })
            console.log(this.state['bus'])
            if (arg) {
                // setTimeout(() => {
                    Taro.hideLoading()
                // }, 500);
            }
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

    goToBusDetail = (e) => {
        console.log("即将跳转详情页", e)
    }

    // 切换tabs标签页
    setActive = (index) => {
        let that = this;
        // 获取当前点击的index索引值
        that.setState({
            isActive: index
        });
        this.getBusStations(index, true)
    };


    render() {
        const vStyleA = {
            marginTop: '5px',
            marginBottom: '5px',
        }
        const {
            isActive,
        } = this.state;
        const tabList = [{title: '城区公交'}, {title: '城乡公交'}];
        // const { posts } = this.state['bus']
        const content = this.state["bus"].map((obj) => {
            return <div style={vStyleA}>
                <AtCard
                    extra={"开往" + obj.destination}
                    title={obj.number}
                    thumb=''
                    onClick={this.goToBusDetail.bind(obj.id)}>
                </AtCard>
            </div>
        })

        return (
            <View className="container">
                <AtSearchBar
                    fixed
                    showActionButton
                    value={this.state["value"]}
                    onChange={this.onChange.bind(this)}
                    onActionClick={this.onActionClick.bind(this)}
                />
                <AtTabs className="tab-wrap tab-fixed" current={isActive}
                        tabList={tabList} onClick={this.setActive}
                        animated={false}>
                    {/*<AtTabsPane current={isActive} index={0}>*/}
                    {/*    <View className={'tab-content ' + (isActive == 0 ? 'show' : 'hide')}>*/}
                    {/*        {content}*/}
                    {/*    </View>*/}
                    {/*</AtTabsPane>*/}
                    {/*<AtTabsPane current={isActive} index={1}>*/}
                    {/*    <View className="dragUpdatePage">*/}
                    {/*        {content}*/}
                    {/*    </View>*/}
                    {/*</AtTabsPane>*/}
                </AtTabs>
                <view className="bus-station-view">
                    {content}
                </view>
            </View>
        )
    }
}