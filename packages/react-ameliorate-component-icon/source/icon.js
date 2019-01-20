import React                            from 'react';
import { componentFactory, PropTypes }  from '@react-ameliorate/core';
import { View, Text }                   from '@react-ameliorate/native-shims';
import styleSheet                       from './icon-styles';

export const Icon = componentFactory('Icon', ({ Parent, componentName }) => {
  return class Icon extends Parent {
    static styleSheet = styleSheet;

    static propTypes = {
      icon: PropTypes.string.isRequired,
      containerStyle: PropTypes.any
    }

    getGlyphMap() {
      return this.iconGlyphMap || this.context.iconGlyphMap;
    }

    getDefaultFontFamily() {
      return this.iconDefaultFontFamily || this.context.iconDefaultFontFamily;
    }

    getIconGlyph() {
      var iconGlyphMap = this.getGlyphMap(),
          rawStyle = this.rawStyle(this.props.style),
          fontFamily = (rawStyle && rawStyle.fontFamily);

      if (!fontFamily)
        fontFamily = this.getDefaultFontFamily();

      if (!fontFamily)
        throw new TypeError('Attempted to use Icon component, but no fontFamily defined (missing "iconDefaultFontFamily" on context?)');

      var glyphMap = (iconGlyphMap && iconGlyphMap[fontFamily]);
      if (!glyphMap)
        throw new TypeError(`Attempted to use Icon component, but found no defined glyph map for fontFamily "${fontFamily}" (missing "iconGlyphMap" on context?)`);

      var icons = ('' + this.props.icon).split(/\s*\|\s*/g);
      for (var i = 0, il = icons.length; i < il; i++) {
        var icon = icons[i],
            glyph = glyphMap[icon];

        if (glyph)
          return glyph;
      }
    }

    render() {
      var glyph = this.getIconGlyph();

      return (
        <View className={this.getRootClassName(componentName)} style={this.style('container', this.props.containerStyle)}>
          <Text style={this.style('icon', this.props.style)} numberOfLines={1}>{glyph}</Text>
        </View>
      );
    }
  };
});

export { styleSheet as iconStyles };
