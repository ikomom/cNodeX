import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { TagProps, TagState } from './tag.interface'
import './tag.scss'

class Tag extends Component<TagProps,TagState > {
  static defaultProps:TagProps = {
    type: "normal",
  }
  constructor(props: TagProps) {
    super(props)
    this.state = {}

    switch (props.type) {
      case "good":
        this.defaultChild = "精华";
        break;
      case "top":
        this.defaultChild = "置顶";
        break;
      case "normal":
        this.defaultChild = "";
        break;
    }
  }

  private readonly defaultChild: string;

  render() {
    return (
      <View className={`fx-tag-wrap fx-tag-${this.props.type}`}>
        {this.defaultChild ? this.defaultChild : this.props.children }
      </View>
    )
  }
}
export default Tag
