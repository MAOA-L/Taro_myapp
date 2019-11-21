//@ts-ignore
import Taro, {Config} from '@tarojs/taro'
import {AtGrid, AtTabsPane} from "taro-ui"
import {View} from "@tarojs/components";

export default class Index extends Taro.Component {

    config: Config = {
        navigationBarTitleText: "首页"
    }

    constructor() {
        super(...arguments)
        this.state = {}
    }

    onClick(e) {
        if(e.value.indexOf("公交") != -1){
            Taro.navigateTo({
                url: '/pages/bus/bus'
            })
        }
    }

    render(): any {
        return (
            <div>
                <AtTabsPane current={0} index={0}>
                    <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>功能区</View>
                </AtTabsPane>
                <AtGrid
                    hasBorder={false}
                    onClick={this.onClick}
                    data={
                        [
                            {
                                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                                value: '公交查询',
                            },
                        ]
                    }/>
            </div>
        )
    }
}