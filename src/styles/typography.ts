const compileTypography = (fontFamily: { title: string; body: string }) => ({
  titleXL: {
    fontFamily: fontFamily.title,
    fontSize: 68,
    fontWeight: 500,
    lineHeight: '140%',
  },
  titleL: {
    fontFamily: fontFamily.title,
    fontSize: 48,
    fontWeight: 500,
    lineHeight: '120%',
  },
  titleM: {
    fontFamily: fontFamily.title,
    fontSize: 32,
    fontWeight: 500,
    lineHeight: '120%',
  },
  titleMS: {
    fontFamily: fontFamily.title,
    fontSize: 24,
    fontWeight: 500,
    lineHeight: '120%',
  },
  titleS: {
    fontFamily: fontFamily.title,
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '140%',
    textTransform: 'uppercase' as const,
  },
  titleXS: {
    fontFamily: fontFamily.title,
    fontSize: 12,
    fontWeight: 600,
    lineHeight: '140%',
    textTransform: 'uppercase' as const,
  },

  /* BODY */
  bodyXL: {
    fontFamily: fontFamily.body,
    fontSize: 20,
    fontWeight: 400,
    lineHeight: '150%',
  },
  bodyL: {
    fontFamily: fontFamily.body,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '140%',
  },
  bodyM: {
    fontFamily: fontFamily.body,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '140%',
  },
  bodyS: {
    fontFamily: fontFamily.body,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '140%',
  },
  bodyXS: {
    fontFamily: fontFamily.body,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '140%',
  },

  /* CAPTION */
  captionL: {
    fontFamily: fontFamily.body,
    fontSize: 32,
    fontWeight: 700,
    lineHeight: '140%',
  },
  captionS: {
    fontFamily: fontFamily.body,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '140%',
  },
});

export default compileTypography;
