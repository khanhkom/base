import { Dimensions, StyleSheet, Image, View, FlatList } from "react-native"
import React, { useState } from "react"
import Carousel from "react-native-reanimated-carousel"
import R from "@app/assets"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { Text } from "@app/components/Text"
import { Icon } from "@app/components/Icon"
import { Divider, List } from "react-native-paper"
const news = [
  {
    title: "Chế độ ăn kiêng và sức khỏe tốt",
    description:
      "Chế độ ăn kiêng cân bằng, giàu chất dinh dưỡng có thể giúp cải thiện sức khỏe và giảm nguy cơ mắc các bệnh mãn tính. Hãy chọn lựa thực phẩm lành mạnh và rèn luyện lối sống lành mạnh! #ChếĐộĂnKiêng",
  },
  {
    title: "Tập luyện thể dục: Đánh tan căng thẳng",
    description:
      "Tập luyện thể dục đều đặn không chỉ giúp cơ thể khỏe mạnh mà còn giảm căng thẳng và cải thiện tâm trạng. Hãy dành ít nhất 30 phút mỗi ngày để chăm sóc sức khỏe toàn diện! #TậpLuyệnThểDục",
  },
  {
    title: "Giấc ngủ đủ giờ: Chìa khóa sức khỏe",
    description:
      "Giấc ngủ đủ giờ và chất lượng là yếu tố quan trọng để duy trì sức khỏe tốt và tăng cường hệ miễn dịch. Hãy tạo điều kiện thuận lợi cho giấc ngủ và hưởng những lợi ích sức khỏe! #GiấcNgủĐủGiờ",
  },
  {
    title: "Bảo vệ thính giác: Cẩn trọng tiếng ồn",
    description:
      "Tiếng ồn quá lớn có thể gây hại lâu dài cho thính giác. Hãy đeo bảo hộ tai khi tiếp xúc với tiếng ồn và tránh môi trường ồn ào để bảo vệ thính giác của bạn! #BảoVệThínhGiác",
  },
]

const Item = ({ item }) => {
  return (
    <List.Item
      style={styles.item}
      left={() => {
        return <Image source={R.images.new_1} style={styles.wrapperImage} />
      }}
      title={() => {
        return (
          <View>
            <Text weight="medium" size="ba" style={{ color: colors.gray_9 }}>
              {item.title}
            </Text>
            <Text weight="normal" size="sm" style={{ color: colors.gray_6 }}>
              {item.description}
            </Text>
          </View>
        )
      }}
    />
  )
}
export default function HotNews() {
  return (
    <View style={styles.container}>
      <View style={styles.itemHead}>
        <Text weight="semiBold" size="xl">
          Tin tức
        </Text>
        <Icon icon="arrow_circle_right" size={WIDTH(24)} />
      </View>
      <FlatList
        data={news}
        renderItem={({ item, index }) => <Item item={item} />}
        ItemSeparatorComponent={() => <Divider />}
        style={{ paddingHorizontal: WIDTH(spacing.md) }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: HEIGHT(spacing.md),
    backgroundColor: colors.gray_0,
    paddingTop: HEIGHT(spacing.md),
  },

  itemHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: WIDTH(343),
    marginHorizontal: WIDTH(spacing.md),
    marginBottom: HEIGHT(12),
  },
  item: {
    width: WIDTH(343),
    paddingLeft: WIDTH(spacing.sm),
    borderRadius: 12,
  },
  wrapperImage: {
    width: WIDTH(72),
    height: WIDTH(72),
    borderRadius: 8,
    backgroundColor: colors.primary_2,
  },
})
