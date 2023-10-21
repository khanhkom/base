// @flow
import React, { PureComponent } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  SafeAreaView,
} from "react-native"
import NetInfo, { NetInfoSubscription } from "@react-native-community/netinfo"
import R from "@app/assets"
import { getHeight, getWidth, HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme"
import colors from "@app/assets/colors"
import { Icon } from "../Icon"
import { Text } from "../Text"

type Props = {}
type State = {
  isConnected: boolean
  loading: boolean
  showPopup: boolean
}
class NoInternetComponent extends PureComponent<Props, State> {
  _subscription: NetInfoSubscription | null = null
  constructor(props: Props) {
    super(props)
    this.state = {
      isConnected: true,
      showPopup: false,
      loading: false,
    }
  }

  componentDidMount() {
    this._subscription = NetInfo.addEventListener((state) => {
      //   this.handleConnectivityChange(state.isConnected)
    })
  }
  componentWillUnmount(): void {
    this._subscription && this._subscription()
  }

  handleConnectivityChange = (isConnected: boolean) => {
    this.setState({ showPopup: !isConnected })
    if (this.state.isConnected !== isConnected) {
      this.setState({ isConnected })
    }
  }
  closeModal = () => {
    this.setState({ showPopup: false })
  }

  render() {
    if (this.state.showPopup)
      return (
        <TouchableWithoutFeedback style={styles.container} onPress={this.closeModal}>
          <SafeAreaView style={styles.opacityTouch}>
            <View style={[styles.offlineContainer, { backgroundColor: colors.white }]}>
              <Icon icon={"no_wifi"} style={styles.imageStyle} />
              <Text style={styles.textStyle} text="Không có kết nối mạng"></Text>
              <Text
                style={styles.subTextStyle}
                text="Vui lòng kiểm tra lại kết nối mạng của bạn!"
              ></Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ loading: true })
                  setTimeout(() => {
                    NetInfo.fetch()
                      .then((state) => {
                        const isConnected = state.isConnected
                        this.setState({ isConnected })
                        this.setState({ showPopup: isConnected })
                      })
                      .catch(() => {})
                    this.setState({ loading: false })
                  }, 1500)
                }}
                style={styles.buttonOk}
              >
                {this.state.loading ? (
                  <ActivityIndicator size="small" color={R.colors.white} />
                ) : (
                  <Text style={{ color: colors.white }}>Thử lại</Text>
                )}
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      )
    else return <View />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  opacityTouch: {
    flex: 1,
    backgroundColor: R.colors.backdrop,
    top: 0,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: getWidth(),
    height: getHeight() * 1.1,
  },
  offlineContainer: {
    width: WIDTH(270),
    paddingVertical: HEIGHT(30),
    backgroundColor: R.colors.white,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: WIDTH(15),
    marginTop: -getHeight() * 0.1,
  },
  textStyle: {
    marginTop: HEIGHT(spacing.md),
  },
  buttonOk: {
    backgroundColor: R.colors.primary,
    height: HEIGHT(40),
    width: WIDTH(100),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: HEIGHT(30),
    paddingHorizontal: WIDTH(15),
    marginTop: HEIGHT(16),
  },
  subTextStyle: {
    marginVertical: HEIGHT(spacing.xxs),
    // width: WIDTH(250),
    textAlign: "center",
  },
  imageStyle: {
    width: WIDTH(200),
    height: HEIGHT(100),
  },
})

export default NoInternetComponent
