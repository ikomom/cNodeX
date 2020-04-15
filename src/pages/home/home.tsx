
    import Taro, { Component, Config } from '@tarojs/taro'
    import { View } from '@tarojs/components'
    // import { connect } from '@tarojs/redux'
    // import Api from '../../utils/request'
    // import Tips from '../../utils/tips'
    import { HomeProps, HomeState } from './home.interface'
    import './home.scss'
    // import {  } from '../../components'

    // @connect(({ home }) => ({
    //     ...home,
    // }))

    class Home extends Component<HomeProps,HomeState > {
    config:Config = {
        navigationBarTitleText: '页面标题'
    }
    constructor(props: HomeProps) {
        super(props)
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
        <View className='fx-home-wrap'>
            页面内容
        </View>
        )
    }
    }
    export default Home
