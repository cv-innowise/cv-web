import { Button, Container, Typography, styled } from '@mui/material'
import { palette } from '@features/theme-provider/mui-palette'

export const Document = styled(Container)(({ theme }) => ({
  color: palette[theme.palette.mode === 'dark' ? 'light' : 'dark'].background?.default,
  height: 'auto !important',
  paddingTop: 32,
  paddingBottom: 32,
  '@media print': {
    margin: 0,
    padding: 0,
    background: palette.light.background?.paper,
    color: palette.light.text?.primary,
    printColorAdjust: 'exact'
  }
}))

export const Summary = styled('div')({
  display: 'grid',
  gridTemplateColumns: '260px 1fr',
  marginBottom: 32
})

export const PageBreak = styled('div')({
  pageBreakAfter: 'always'
})

export const Head = styled('section')({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  marginBottom: 32
})

export const Position = styled(Typography)({
  textTransform: 'uppercase',
  gridColumn: 1
})

export const Export = styled(Button)({
  height: 40,
  gridColumn: 3,
  gridRow: 1,
  minWidth: 160,
  '@media print': {
    display: 'none'
  }
})

export const Left = styled('section')({
  paddingRight: 24
})

export const Main = styled('section')({
  paddingLeft: 24,
  paddingBottom: 16,
  borderLeft: '1px #c63030 solid'
})

export const Title = styled(Typography)({
  fontWeight: 'bold',
  marginTop: 16,
  marginBottom: 8
})
