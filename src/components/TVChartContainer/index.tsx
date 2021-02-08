// import * as React from 'react';
// import './index.css';
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
//       // BEWARE: no trailing slash is expected in feed URL
//       // tslint:disable-next-line:no-any
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

import React, { useState, useEffect } from 'react';
import './index.css';
import {
  widget,
  ChartingLibraryWidgetOptions,
  LanguageCode,
  IChartingLibraryWidget,
  //   ResolutionString,
} from '../../charting_library';

export interface ChartContainerProps {
  symbol: ChartingLibraryWidgetOptions['symbol'];
  interval: ChartingLibraryWidgetOptions['interval'];
  datafeedUrl: string;
  libraryPath: ChartingLibraryWidgetOptions['library_path'];
  chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'];
  chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'];
  clientId: ChartingLibraryWidgetOptions['client_id'];
  userId: ChartingLibraryWidgetOptions['user_id'];
  fullscreen: ChartingLibraryWidgetOptions['fullscreen'];
  autosize: ChartingLibraryWidgetOptions['autosize'];
  studiesOverrides: ChartingLibraryWidgetOptions['studies_overrides'];
  containerId: ChartingLibraryWidgetOptions['container_id'];
}

export interface ChartContainerState {}

function getLanguageFromURL(): LanguageCode | null {
  const regex = new RegExp('[\\?&]lang=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null
    ? null
    : (decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode);
}

export default function TVChartContainer() {
  const [symbol] = useState('AAPL');
  const [interval] = useState('D');
  const [containerId] = useState('tv_chart_container');
  const [datafeedUrl] = useState('https://demo_feed.tradingview.com');
  const [libraryPath] = useState('/charting_library/');
  const [chartsStorageUrl] = useState('https://saveload.tradingview.com');
  const [chartsStorageApiVersion] = useState('1.1');
  const [clientId] = useState('tradingview.com');
  const [userId] = useState('public_user_id');
  const [fullscreen] = useState(false);
  const [autosize] = useState(true);
  const [studiesOverrides] = useState({});

  let tvWidget: IChartingLibraryWidget | null = null;

  useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: symbol as string,
      // BEWARE: no trailing slash is expected in feed URL
      // tslint:disable-next-line:no-any
      datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
        datafeedUrl
      ),
      interval: interval as ChartingLibraryWidgetOptions['interval'],
      container_id: containerId as ChartingLibraryWidgetOptions['container_id'],
      library_path: libraryPath as string,

      locale: getLanguageFromURL() || 'en',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      charts_storage_url: chartsStorageUrl,
      //@ts-ignore
      charts_storage_api_version: chartsStorageApiVersion,
      client_id: clientId,
      user_id: userId,
      fullscreen: fullscreen,
      autosize: autosize,
      studies_overrides: studiesOverrides,
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

  return <div id={containerId} className={'TVChartContainer'} />;
}
