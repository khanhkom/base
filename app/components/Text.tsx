import i18n from "i18n-js"
import React from "react"
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native"
import { isRTL, translate, TxKeyPath } from "../i18n"
import { colors, typography } from "../theme"

type Sizes = keyof typeof $sizeStyles
type Weights = keyof typeof typography.primary
type Presets = keyof typeof $presets

export interface TextProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: i18n.TranslateOptions
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
  /**
   * Text weight modifier.
   */
  weight?: Weights
  /**
   * Text size modifier.
   */
  size?: Sizes
  /**
   * Children components.
   */
  children?: React.ReactNode
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Text.md)
 */
export function Text(props: TextProps) {
  const { weight, size, tx, txOptions, text, children, style: $styleOverride, ...rest } = props

  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  const preset: Presets = $presets[props.preset] ? props.preset : "default"
  const $styles = [
    $rtlStyle,
    $presets[preset],
    $fontWeightStyles[weight],
    $sizeStyles[size],
    $styleOverride,
  ]

  return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  )
}

const $sizeStyles = {
  xxxxxl: { fontSize: 40, lineHeight: 60 } satisfies TextStyle,
  xxxxl: { fontSize: 32, lineHeight: 48 } satisfies TextStyle,
  xxxl: { fontSize: 24, lineHeight: 36 } satisfies TextStyle,
  xxl: { fontSize: 20, lineHeight: 30 } satisfies TextStyle,
  xl: { fontSize: 18, lineHeight: 26 } satisfies TextStyle,
  md: { fontSize: 16, lineHeight: 24 } satisfies TextStyle,
  ba: { fontSize: 14, lineHeight: 21 } satisfies TextStyle,
  sm: { fontSize: 12, lineHeight: 18 } satisfies TextStyle,
  xs: { fontSize: 10, lineHeight: 15 } satisfies TextStyle,
  // xxs: { fontSize: 12, lineHeight: 18 } satisfies TextStyle,
}

const $fontWeightStyles = Object.entries(typography.primary).reduce((acc, [weight, fontFamily]) => {
  return { ...acc, [weight]: { fontFamily } }
}, {}) as Record<Weights, TextStyle>

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.sm,
  $fontWeightStyles.normal,
  { color: colors.text },
]

const $presets = {
  default: $baseStyle,

  bold: [$baseStyle, $fontWeightStyles.bold] as StyleProp<TextStyle>,
  xxxlsemibold: [$baseStyle, $sizeStyles.xxxl, $fontWeightStyles.semiBold] as StyleProp<TextStyle>,

  heading: [$baseStyle, $sizeStyles.xxl, $fontWeightStyles.bold] as StyleProp<TextStyle>,
  mdRegular: [$baseStyle, $sizeStyles.md, $fontWeightStyles.normal] as StyleProp<TextStyle>,
  mdMedium: [$baseStyle, $sizeStyles.md, $fontWeightStyles.medium] as StyleProp<TextStyle>,
  baMedium: [$baseStyle, $sizeStyles.ba, $fontWeightStyles.medium] as StyleProp<TextStyle>,
  baRegular: [$baseStyle, $sizeStyles.ba, $fontWeightStyles.normal] as StyleProp<TextStyle>,
  baSemibold: [$baseStyle, $sizeStyles.ba, $fontWeightStyles.semiBold] as StyleProp<TextStyle>,
  smRegular: [$baseStyle, $sizeStyles.sm, $fontWeightStyles.normal] as StyleProp<TextStyle>,

  subheading: [$baseStyle, $sizeStyles.xl, $fontWeightStyles.medium] as StyleProp<TextStyle>,

  formLabel: [$baseStyle, $fontWeightStyles.medium] as StyleProp<TextStyle>,

  formHelper: [$baseStyle, $sizeStyles.sm, $fontWeightStyles.normal] as StyleProp<TextStyle>,
}

const $rtlStyle: TextStyle = isRTL ? { writingDirection: "rtl" } : {}
