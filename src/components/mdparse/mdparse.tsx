import Taro, { Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { MdparseProps, MdparseState } from './mdparse.interface'
import './mdparse.scss'
import towxml from '../../towxml/index'
import { isEmpty } from "../../utils/common";
import LoadMore from "../LoadMore/LoadMore";

class MdParse extends Taro.Component<MdparseProps, MdparseState> {
  config: Config = {
    usingComponents: {
      'cptowxml': '../../towxml/towxml',
    }
  }

  static defaultProps: { content: string } = {
    content: ''
  }

  constructor(props: MdparseProps) {
    super(props)
    this.state = {
      nodes: {}
    }
  }


  resolve = (content: string) => {
    const nodes = towxml(content, this.props.type, {
      // theme:'dark',					// 主题，默认`light`
      events: {
        tap: (e) => {
          console.log('tap', e);
        }
      }
    }) ;
    this.setState({nodes: (nodes || {})})
  }

  componentDidMount() {
    //初始化
    this.resolve(this.props.content);
  }

  componentWillReceiveProps(nextProps: Readonly<MdparseProps>): void {
    // console.warn('content', this.props.content, nextProps.content, nextProps.content !== this.props.content)
    if (nextProps.content !== this.props.content) {
      this.resolve(nextProps.content)
    }
  }

  render() {
    const {nodes} = this.state;
    return (
      <View className='fx-mdparse-wrap'>
        {isEmpty(nodes) ? <LoadMore /> : <cptowxml nodes={nodes} />}
        {/*<cptowxml nodes={nodes} />*/}
      </View>
    )
  }
}

export default MdParse
