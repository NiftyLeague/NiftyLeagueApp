// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as createTypography from '@mui/material/styles/createTypography';

declare module '@mui/material/styles/createTypography' {
  export interface FontStyle
    extends Required<{
      textTransform: TextTransform;
      fontSize: string | number; // added string
    }> {}
  export interface FontStyleOptions extends Partial<FontStyle> {
    fontSize?: string | number; // added string
  }
  export type Variant =
    | 'displayLarge'
    | 'displaySmall'
    | 'termsCondition'
    | 'labelIOSSwitch'
    | 'paragraphLarge'
    | 'paragraphMedium'
    | 'paragraphSmall'
    | 'paragraphXSmall'
    | 'paragraphXXSmall'
    | 'paragraphXXXSmall'
    | 'paragraphP2Large'
    | 'paragraphP2Medium'
    | 'paragraphP2Small'
    | 'paragraphP2XSmall'
    | 'paragraphP2XXSmall'
    | 'paragraphP2XXXSmall'
    | 'customInput'
    | 'mainContent'
    | 'menuCaption'
    | 'subMenuCaption'
    | 'commonAvatar'
    | 'smallAvatar'
    | 'mediumAvatar'
    | 'largeAvatar';

  export interface TypographyOptions
    extends Partial<
      Record<Variant, TypographyStyleOptions> & FontStyleOptions
    > {
    displayLarge?: TypographyStyleOptions;
    displaySmall?: TypographyStyleOptions;
    termsCondition?: TypographyStyleOptions;
    labelIOSSwitch?: TypographyStyleOptions;
    paragraphLarge?: TypographyStyleOptions;
    paragraphMedium?: TypographyStyleOptions;
    paragraphSmall?: TypographyStyleOptions;
    paragraphXSmall?: TypographyStyleOptions;
    paragraphXXSmall?: TypographyStyleOptions;
    paragraphXXXSmall?: TypographyStyleOptions;
    paragraphP2Large?: TypographyStyleOptions;
    paragraphP2Medium?: TypographyStyleOptions;
    paragraphP2Small?: TypographyStyleOptions;
    paragraphP2XSmall?: TypographyStyleOptions;
    paragraphP2XXSmall?: TypographyStyleOptions;
    paragraphP2XXXSmall?: TypographyStyleOptions;
    customInput?: TypographyStyleOptions;
    mainContent?: TypographyStyleOptions;
    menuCaption?: TypographyStyleOptions;
    subMenuCaption?: TypographyStyleOptions;
    commonAvatar?: TypographyStyleOptions;
    smallAvatar?: TypographyStyleOptions;
    mediumAvatar?: TypographyStyleOptions;
    largeAvatar?: TypographyStyleOptions;
  }

  export interface Typography
    extends Record<Variant, TypographyStyle>,
      FontStyle,
      TypographyUtils {
    displayLarge: TypographyStyle;
    displaySmall: TypographyStyle;
    termsCondition: TypographyStyle;
    labelIOSSwitch: TypographyStyle;
    paragraphLarge: TypographyStyle;
    paragraphMedium: TypographyStyle;
    paragraphSmall: TypographyStyle;
    paragraphXSmall: TypographyStyle;
    paragraphXXSmall: TypographyStyle;
    paragraphXXXSmall: TypographyStyle;
    paragraphP2Large: TypographyStyle;
    paragraphP2Medium: TypographyStyle;
    paragraphP2Small: TypographyStyle;
    paragraphP2XSmall: TypographyStyle;
    paragraphP2XXSmall: TypographyStyle;
    paragraphP2XXXSmall: TypographyStyle;
    customInput: TypographyStyle;
    mainContent: TypographyStyle;
    menuCaption: TypographyStyleOptions;
    subMenuCaption: TypographyStyleOptions;
    commonAvatar: TypographyStyle;
    smallAvatar: TypographyStyle;
    mediumAvatar: TypographyStyle;
    largeAvatar: TypographyStyle;
  }
}
// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    displayLarge: true;
    displaySmall: true;
    termsCondition: true;
    labelIOSSwitch: true;
    paragraphLarge: true;
    paragraphMedium: true;
    paragraphSmall: true;
    paragraphXSmall: true;
    paragraphXXSmall: true;
    paragraphXXXSmall: true;
    paragraphP2Large: true;
    paragraphP2Medium: true;
    paragraphP2Small: true;
    paragraphP2XSmall: true;
    paragraphP2XXSmall: true;
    paragraphP2XXXSmall: true;
  }
}
