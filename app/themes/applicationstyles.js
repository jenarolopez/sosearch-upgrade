import Fonts    from './fonts'
import Metrics  from './metrics'
import Colors   from './colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {

  screen: {
    mainContainer: {
      flex            : 1,
      backgroundColor : Colors.TRANSPARENT
    },
    backgroundImage: {
      position        : 'absolute',
      top             : 0,
      left            : 0,
      bottom          : 0,
      right           : 0
    },
    container: {
      flex            : 1,
      paddingTop      : Metrics.baseMargin,
      backgroundColor : Colors.TRANSPARENT
    },
    section: {
      margin          : Metrics.section,
      padding         : Metrics.baseMargin
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical : Metrics.doubleBaseMargin,
      color           : Colors.SNOW,
      marginVertical  : Metrics.smallMargin,
      textAlign       : 'center'
    },
    subtitle: {
      color           : Colors.SNOW,
      padding         : Metrics.smallMargin,
      marginBottom    : Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize        : 14,
      color           : Colors.text
    }
  },
  darkLabelContainer: {
    padding           : Metrics.smallMargin,
    paddingBottom     : Metrics.doubleBaseMargin,
    borderBottomColor : Colors.border,
    borderBottomWidth : 1,
    marginBottom      : Metrics.baseMargin
  },
  darkLabel: {
    fontFamily        : Fonts.type.bold,
    color             : Colors.SNOW
  },
  groupContainer: {
    margin            : Metrics.smallMargin,
    flexDirection     : 'row',
    justifyContent    : 'space-around',
    alignItems        : 'center'
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color             : Colors.COAL,
    backgroundColor   : Colors.RICE_PAPER,
    padding           : Metrics.smallMargin,
    marginTop         : Metrics.smallMargin,
    marginHorizontal  : Metrics.baseMargin,
    borderWidth       : 1,
    borderColor       : Colors.EMBER,
    alignItems        : 'center',
    textAlign         : 'center'
  }
}

export default ApplicationStyles
