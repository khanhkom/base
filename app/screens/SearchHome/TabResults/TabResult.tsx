import colors from "@app/assets/colors"
import { Text } from "@app/components/Text"
import * as React from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import FAQ from "./Item/FAQ"
import News from "./Item/News"
import Knowledge from "./Item/Knowledge"
import Doctor from "./Item/Doctor"
import Facilities from "./Item/Facilities"
import Drugstore from "./Item/Drugstore"
import Services from "./Item/Services"

const SecondRoute = () => <View style={[styles.scene, { backgroundColor: "#673ab7" }]} />

// Create an array of routes, each with a unique key and component
const routesSearch = [
  { key: "0", title: "Hỏi đáp cộng đồng" },
  { key: "1", title: "Tin tức" },
  { key: "2", title: "Kiến thức sơ cấp cứu" },
  { key: "3", title: "Bác sĩ" },
  { key: "4", title: "Cơ sở y tế" },
  { key: "5", title: "Nhà thuốc" },
  { key: "6", title: "Gói dịch vụ" },
]

// Create a function to render each scene based on its key
const renderScene = SceneMap({
  0: FAQ,
  1: News,
  2: Knowledge,
  3: Doctor,
  4: Facilities,
  5: Drugstore,
  6: Services,
})

export default function MyTabView() {
  const [index, setIndex] = React.useState(0)
  const [routes, setRoutes] = React.useState(routesSearch)

  // Render the TabView component with the necessary props
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get("window").width }}
      renderTabBar={(props) => {
        console.log("props", props)
        return (
          <TabBar
            {...props}
            indicatorStyle={styles.indicatorStyle}
            tabStyle={{ width: "auto" }}
            scrollEnabled={true}
            style={styles.tabStyle}
            labelStyle={styles.labelStyle}
            activeColor={colors.primary}
            renderLabel={({ focused, color, route }) => {
              return (
                <Text size="ba" style={{ color }}>
                  {route?.title}
                </Text>
              )
            }}
          />
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabStyle: { backgroundColor: colors.white },
  indicatorStyle: { backgroundColor: colors.primary, height: 1 },
  labelStyle: { color: colors.gray_6, textTransform: "none" },
})
