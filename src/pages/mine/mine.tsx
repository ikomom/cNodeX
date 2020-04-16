
    import Taro, { Component, Config } from '@tarojs/taro'
    import { View } from '@tarojs/components'
    // import { connect } from '@tarojs/redux'
    // import Api from '../../utils/request'
    // import Tips from '../../utils/tips'
    import { MineProps, MineState } from './mine.interface'
    import './mine.scss'
    // import {  } from '../../components'

    // @connect(({ mine }) => ({
    //     ...mine,
    // }))

    class Mine extends Component<MineProps,MineState > {
    config:Config = {
        navigationBarTitleText: '页面标题'
    }
    constructor(props: MineProps) {
        super(props)
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
        <View className='fx-mine-wrap'>
            页面内容
        </View>
        )
    }
    }
    export default Mine
