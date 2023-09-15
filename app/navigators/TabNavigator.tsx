import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CommonActions, CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { Platform, TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon, Text } from "../components"
import { translate } from "../i18n"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import Home from "@app/screens/Home"
import Profile from "@app/screens/Profile"
import Video from "@app/screens/Video"
import History from "@app/screens/History"
import { navigate } from "./navigationUtilities"
import { BottomNavigation } from "react-native-paper"
import { HEIGHT } from "@app/config/functions"
import R from "@app/assets"
export type DemoTabParamList = {
  Home: undefined
  Profile: undefined
  Video: undefined
  History: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

export function TabNavigator() {
  const { bottom } = useSafeAreaInsets()
  // navigate("Login")
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
        tabBarShowLabel: false,
      }}
      initialRouteName="Home"
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            })

            if (event.defaultPrevented) {
              preventDefault()
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              })
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key]
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 })
            }

            return null
          }}
          style={[
            { backgroundColor: R.colors.white },
            Platform.OS === "ios" && {
              height: HEIGHT(80),
            },
          ]}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key]
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title

            return label
          }}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ focused }) => (
            <Icon
              icon={focused ? "ic_home_active" : "ic_home"}
              color={focused && colors.tint}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: "Lịch",
          tabBarIcon: ({ focused }) => (
            <Icon
              icon={focused ? "ic_calendar_active" : "ic_calendar"}
              color={focused && colors.tint}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Video"
        component={Video}
        options={{
          tabBarShowLabel: false,
          tabBarAccessibilityLabel: translate("demoNavigator.podcastListTab"),
          tabBarLabel: "Chat",
          tabBarIcon: ({ focused }) => (
            <Icon
              icon={focused ? "ic_chat_filled" : "ic_chat"}
              color={focused && colors.tint}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <Icon
              icon={focused ? "ic_profile" : "ic_profile"}
              color={focused && colors.tint}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}

// @demo remove-file
