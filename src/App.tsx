// import * as React from 'react';
// import {
//   widget,
//   ChartingLibraryWidgetOptions,
//   LanguageCode,
//   IChartingLibraryWidget,
//   ResolutionString,
// } from '../../charting_library';

// export interface ChartContainerProps {
//   symbol: ChartingLibraryWidgetOptions['symbol'];
//   interval: ChartingLibraryWidgetOptions['interval'];
//   datafeedUrl: string;
//   libraryPath: ChartingLibraryWidgetOptions['library_path'];
//   chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'];
//   chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'];
//   clientId: ChartingLibraryWidgetOptions['client_id'];
//   userId: ChartingLibraryWidgetOptions['user_id'];
//   fullscreen: ChartingLibraryWidgetOptions['fullscreen'];
//   autosize: ChartingLibraryWidgetOptions['autosize'];
//   studiesOverrides: ChartingLibraryWidgetOptions['studies_overrides'];
//   containerId: ChartingLibraryWidgetOptions['container_id'];
// }

// export interface ChartContainerState {}

// function getLanguageFromURL(): LanguageCode | null {
//   const regex = new RegExp('[\\?&]lang=([^&#]*)');
//   const results = regex.exec(location.search);
//   return results === null
//     ? null
//     : (decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode);
// }

// export class TVChartContainer extends React.PureComponent<
//   Partial<ChartContainerProps>,
//   ChartContainerState
// > {
//   public static defaultProps: ChartContainerProps = {
//     symbol: 'AAPL',
//     interval: 'D' as ResolutionString,
//     containerId: 'tv_chart_container',
//     datafeedUrl: 'https://demo_feed.tradingview.com',
//     libraryPath: '/charting_library/',
//     chartsStorageUrl: 'https://saveload.tradingview.com',
//     chartsStorageApiVersion: '1.1',
//     clientId: 'tradingview.com',
//     userId: 'public_user_id',
//     fullscreen: false,
//     autosize: true,
//     studiesOverrides: {},
//   };

//   private tvWidget: IChartingLibraryWidget | null = null;

//   public componentDidMount(): void {
//     const widgetOptions: ChartingLibraryWidgetOptions = {
//       symbol: this.props.symbol as string,
//       datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
//         this.props.datafeedUrl
//       ),
//       interval: this.props.interval as ChartingLibraryWidgetOptions['interval'],
//       container_id: this.props
//         .containerId as ChartingLibraryWidgetOptions['container_id'],
//       library_path: this.props.libraryPath as string,

//       locale: getLanguageFromURL() || 'en',
//       disabled_features: ['use_localstorage_for_settings'],
//       enabled_features: ['study_templates'],
//       charts_storage_url: this.props.chartsStorageUrl,
//       charts_storage_api_version: this.props.chartsStorageApiVersion,
//       client_id: this.props.clientId,
//       user_id: this.props.userId,
//       fullscreen: this.props.fullscreen,
//       autosize: this.props.autosize,
//       studies_overrides: this.props.studiesOverrides,
//     };

//     const tvWidget = new widget(widgetOptions);
//     this.tvWidget = tvWidget;

//     tvWidget.onChartReady(() => {
//       tvWidget.headerReady().then(() => {
//         const button = tvWidget.createButton();
//         button.setAttribute('title', 'Click to show a notification popup');
//         button.classList.add('apply-common-tooltip');
//         button.addEventListener('click', () =>
//           tvWidget.showNoticeDialog({
//             title: 'Notification',
//             body: 'TradingView Charting Library API works correctly',
//             callback: () => {
//               console.log('Noticed!');
//             },
//           })
//         );
//         button.innerHTML = 'Check API';
//       });
//     });
//   }

//   public componentWillUnmount(): void {
//     if (this.tvWidget !== null) {
//       this.tvWidget.remove();
//       this.tvWidget = null;
//     }
//   }

//   public render(): JSX.Element {
//     return <div id={this.props.containerId} className={'TVChartContainer'} />;
//   }
// }

import { useEffect } from 'react';
import {
  widget,
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
} from './charting_library';

export default function App() {
  const containerId = 'tv_chart_container';

  let tvWidget: IChartingLibraryWidget | null = null;

  useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: 'AAPL',
      //@ts-ignore
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
        'https://demo_feed.tradingview.com'
      ),
      //@ts-ignore
      interval: 'D',
      container_id: containerId,
      library_path: '/charting_library/',
      locale: 'en', //getLanguageFromURL() || 'en', //#get from react-i18n
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      charts_storage_url: 'https://saveload.tradingview.com',
      charts_storage_api_version: '1.1',
      client_id: 'tradingview.com',
      user_id: 'public_user_id',
      fullscreen: false,
      autosize: true,
      studies_overrides: {},
    };

    tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(() => {
      //@ts-ignore
      tvWidget.headerReady().then(() => {
        //@ts-ignore
        const button = tvWidget.createButton();
        button.setAttribute('title', 'Click to show a notification popup');
        button.classList.add('apply-common-tooltip');
        button.addEventListener('click', () =>
          //@ts-ignore
          tvWidget.showNoticeDialog({
            title: 'Notification',
            body: 'TradingView Charting Library API works correctly',
            callback: () => {
              console.log('Noticed!');
            },
          })
        );
        button.innerHTML = 'Check API';
      });
    });

    // return () => {
    //   if (tvWidget !== null) {
    //     tvWidget.remove();
    //     let tvWidget = null;
    //   }
    // };
  }, []);

  return <div id={containerId} style={{ height: 'calc(100vh - 80px)' }} />;
}
