import React                            from 'react';
import { componentFactory, PropTypes }  from '@base';
import { View }                         from '@react-ameliorate/react-native-shims';
import { NavigationBar }                from '@react-ameliorate/pager-bar';
import styleSheet                       from './pager-styles';

const Pager = componentFactory('Pager', ({ Parent, componentName }) => {
  return class Pager extends Parent {
    static styleSheet = styleSheet;

    static propTypes = {
      pages: PropTypes.array,
      page: PropTypes.any,
      onRequestPageChange: PropTypes.func
    };

    constructor(props, ...args) {
      super(props, ...args);

      this._currentPage = null;
    }

    onTabPress({ tab, event }) {
      if (tab === this._currentPage)
        return;

      this._currentPage = tab;

      return this.callProvidedCallback('onRequestPageChange', { event, page: tab });
    }

    render(children) {
      return (
        <View className={this.getRootClassName(componentName)} style={this.style('container')}>
          <NavigationBar
            className={this.getRootClassName(componentName, 'pagerTabs')}
            tabs={this.props.pages}
            tab={this.props.page}
            onTabPress={this.onTabPress}
          />

          <View
            className={this.getRootClassName(componentName, 'pagerPageContainer')}
            style={this.style('pageContainer')}
          >
            {this.getChildren(children)}
          </View>
        </View>
      );
    }
  };
});

export { Pager };