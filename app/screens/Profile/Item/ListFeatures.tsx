import { StyleSheet, View, Image, FlatList } from "react-native"
import React from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import colors from "@app/assets/colors"
import { spacing } from "@app/theme/spacing"
import R from "@app/assets"
import { Card, Divider, List } from "react-native-paper"
import { Text } from "@app/components/Text"
import { navigate } from "@app/navigators/navigationUtilities"
const TYPE_FEATURES = {
  INFOR: 0,
  PATIENT_PROFILE: 1,
  FAQ: 2,
  RATING: 3,
  HOTLINE: 4,
  PRIVACY: 5,
}
const LIST_FEATURES_1 = [
  {
    icon: R.images.tag_user,
    title: "Thông tin tài khoản",
    type: TYPE_FEATURES.INFOR,
  },
  {
    icon: R.images.ic_profile_patient,
    title: "Hồ sơ y tế",
    type: TYPE_FEATURES.PATIENT_PROFILE,
  },
  {
    icon: R.images.messages_2,
    title: "Một số câu hỏi thường gặp",
    type: TYPE_FEATURES.FAQ,
  },
]
const LIST_FEATURES_2 = [
  {
    icon: R.images.star,
    title: "Đánh giá ứng dụng",
    type: TYPE_FEATURES.INFOR,
  },
  {
    icon: R.images.call_calling,
    title: "Liên hệ hotline: 0123 456 789",
    type: TYPE_FEATURES.PATIENT_PROFILE,
  },
  {
    icon: R.images.security_safe,
    title: "Quy định và Chính sách bảo mật",
    type: TYPE_FEATURES.FAQ,
  },
]
const Item = ({ icon, title, onPress }) => {
  return (
    <List.Item
      onPress={onPress}
      title={() => {
        return (
          <Text size="md" weight="normal" style={{ color: colors.gray_9 }}>
            {title}
          </Text>
        )
      }}
      left={() => {
        return <Image source={icon} style={styles.icon} />
      }}
    />
  )
}
export default function ListFeatures() {
  const onPress = (index: number) => {
    switch (index) {
      case TYPE_FEATURES.INFOR:
        navigate("Account")
        break
      case TYPE_FEATURES.PATIENT_PROFILE:
        navigate("PatientProfile")
        break

      default:
        break
    }
  }
  return (
    <View style={styles.container}>
      <Card mode="contained" style={styles.card}>
        <FlatList
          data={LIST_FEATURES_1}
          renderItem={({ item, index }) => {
            return <Item icon={item.icon} title={item.title} onPress={() => onPress(index)} />
          }}
          keyExtractor={(item, index) => String(index)}
          ItemSeparatorComponent={() => {
            return <Divider style={{ marginLeft: WIDTH(42) }} />
          }}
        />
      </Card>
      <Card mode="contained" style={styles.card2}>
        <FlatList
          data={LIST_FEATURES_2}
          renderItem={({ item, index }) => {
            return <Item icon={item.icon} title={item.title} onPress={() => onPress(index)} />
          }}
          keyExtractor={(item, index) => String(index)}
          ItemSeparatorComponent={() => {
            return <Divider style={{ marginLeft: WIDTH(42) }} />
          }}
        />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: WIDTH(24),
    borderTopRightRadius: WIDTH(24),
    backgroundColor: colors.gray_1,
    paddingVertical: HEIGHT(spacing.md),
    paddingHorizontal: WIDTH(spacing.md),
    marginTop: -HEIGHT(spacing.lg),
  },
  card: {
    backgroundColor: colors.white,
    paddingHorizontal: WIDTH(spacing.md),
  },
  card2: {
    backgroundColor: colors.white,
    paddingHorizontal: WIDTH(spacing.md),
    marginTop: HEIGHT(spacing.sm),
  },
  icon: {
    width: WIDTH(24),
    height: WIDTH(24),
  },
})
